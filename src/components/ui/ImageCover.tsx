import { Image, ImageProps } from '@chakra-ui/react';

const ImageCover = (props: ImageProps): JSX.Element => {
  return (
    <Image
      objectFit="cover"
      css={{
        height: '100%',
        width: '100%'
      }}
      {...props}
    />
  );
};

export default ImageCover;
