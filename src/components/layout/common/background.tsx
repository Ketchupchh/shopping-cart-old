import Image from "next/image";

type BackgroundProps = {
    image: string
}

export function Background({
    image
} : BackgroundProps) : JSX.Element
{
    return (
        <>
          <div className='fixed top-0 left-0 w-full min-h-screen bg-black opacity-50 z-[-97]'></div>
          <div className='fixed top-0 left-0 w-full min-h-screen backdrop-blur-sm z-[-98]'></div>
          <Image
              className='fixed top-0 left-0 w-full min-h-screen z-[-99]'
              src={image}
              alt="home-bg"
              fill
              objectFit='cover'
            >
          </Image>
        </>
    );
}