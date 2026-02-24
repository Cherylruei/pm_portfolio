// Front: your cartoon avatar. Replace with: /images/avatar-cartoon.png (or .jpg)
// Back: your personal photo. Replace with: /images/avatar-photo.jpg
const CARTOON_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQUPWtUY5iRJNu1JyYU-klH2wMZOs61mcPCWW1vstgxmvk3aP5MOcpqP7Ze21tEonoug5VfLU6US4XetmHPVMUjHB3cvQeyfADAIrvFuFKYUStyrpVxlrlVHDookV4ZjMmzw6k6__0qeHJ8UXGDZxcFZ2KrToXU_Sjn5oWvXrzCJf5wD4p3ya-qIeLE25CinoaG7PBAH9zJ0ZuYUOZkyJ0Rv7YkkLy2CWjRawzXrI9eXmTF4vaZdGNMEilPOSSYI9p6BU5tdohXiY'
const PHOTO_SRC = '/images/avatar-cartoon.svg' // TODO: replace with your personal photo

export default function FlipCard() {
    return (
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 flip-card cursor-pointer">
            <div className="flip-card-inner w-full h-full relative">

                {/* Front – cartoon avatar */}
                <div className="flip-card-front absolute w-full h-full rounded-full border-[8px] border-primary bg-yellow-50 dark:bg-slate-700 overflow-hidden shadow-2xl">
                    <img
                        src={CARTOON_SRC}
                        alt="Profile Avatar - Cartoon"
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                </div>

                {/* Back – personal photo */}
                <div className="flip-card-back absolute w-full h-full rounded-full border-[8px] border-primary bg-primary overflow-hidden shadow-2xl">
                    <img
                        src={PHOTO_SRC}
                        alt="Profile Avatar - Personal Photo"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Pulsing ring decoration */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-full -z-10 animate-pulse" />
        </div>
    )
}
