export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_PROJECTS_DB_ID

  if (!apiKey || !dbId) {
    return res.status(500).json({ error: 'Notion credentials not configured' })
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: { property: 'Status', select: { equals: 'Published' } },
          sorts: [{ property: 'Order', direction: 'ascending' }],
        }),
      }
    )

    const data = await response.json()

    const projects = data.results.map((page) => {
      const p = page.properties
      const text = (field) => p[field]?.rich_text?.[0]?.plain_text ?? ''
      const url = (field) => p[field]?.url ?? null

      return {
        id: text('Slug') || page.id,
        title: p.Name?.title?.[0]?.plain_text ?? '',
        role: text('Role'),
        summary: text('Summary'),
        tags: p.Tags?.multi_select?.map((t) => t.name) ?? [],
        tagColor: p.TagColor?.select?.name ?? 'blue',
        period: text('Period'),
        coverImage: url('CoverImage'),
        heroImage: url('HeroImage'),
        demoUrl: url('DemoUrl'),
        caseStudyUrl: url('CaseStudyUrl'),
        featured: p.Featured?.checkbox ?? false,
        detail: {
          overview: text('Overview'),
          highlights: [text('Highlight1'), text('Highlight2'), text('Highlight3')].filter(Boolean),
          problem: text('Problem'),
          process: text('Process'),
          outcome: text('Outcome'),
          reflection: text('Reflection'),
          tools: p.Tools?.multi_select?.map((t) => t.name) ?? [],
          images: [],
        },
      }
    })

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({ projects })
  } catch (error) {
    console.error('Notion API error:', error)
    return res.status(500).json({ error: 'Failed to fetch projects' })
  }
}
