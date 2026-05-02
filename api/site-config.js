export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_SITE_CONFIG_DB_ID

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
        body: JSON.stringify({ page_size: 100 }),
      }
    )

    const data = await response.json()

    if (!response.ok || data.object === 'error') {
      console.error('Notion API error:', data)
      return res.status(502).json({ error: 'Notion API error', details: data })
    }

    const config = {}
    for (const page of data.results) {
      const p = page.properties
      const key = p.Key?.title?.[0]?.plain_text ?? ''
      const value = p.Value?.rich_text?.[0]?.plain_text ?? ''
      if (key) config[key] = value
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({ config })
  } catch (error) {
    console.error('Notion site-config error:', error)
    return res.status(500).json({ error: 'Failed to fetch site config' })
  }
}
