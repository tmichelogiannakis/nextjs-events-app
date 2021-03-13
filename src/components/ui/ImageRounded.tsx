import Image, { ImageProps } from 'next/image';

const ImageRounded = (props: ImageProps): JSX.Element => {
  return (
    <>
      <Image className="image-rounded" {...props} />
      <style jsx global>{`
        .image-rounded {
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default ImageRounded;
