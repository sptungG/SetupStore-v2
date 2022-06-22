import React from "react";
import { Image, Skeleton, Card } from "antd";
import axios from "axios";
import MasonryLayout from "./MasonryLayout";

const Gallery = ({ count = 9, column = 3 }) => {
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const accessKey = "uCQCPXNFMbJKFb4xJjlnd8Yiuz03HBIoGMGhK1SCZ8c";
  const getPhotos = async () =>
    await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&query=setup%20desk&count=${count}`
    );

  React.useEffect(() => {
    setLoading(true);
    const loadPhotos = () =>
      getPhotos().then((p) => {
        setPhotos(p.data);
        setLoading(false);
      });
    if (process.env.REACT_APP_ENV === "PRODUCTION") loadPhotos();
  }, []);

  return (
    <>
      {photos.length === 0 || loading ? (
        <MasonryLayout id="gallery" columns={column}>
          {Array(count)
            .fill(null)
            .map((item) => (
              <Card id="skeleton" key={item}>
                <Skeleton active></Skeleton>
              </Card>
            ))}
        </MasonryLayout>
      ) : (
        <MasonryLayout id="gallery" columns={column}>
          {photos.map((item) => (
            <Image
              key={item.id}
              width={"100%"}
              height={"100%"}
              src={item.urls.regular}
              alt={item.id}
            />
          ))}
        </MasonryLayout>
      )}
    </>
  );
};

export default Gallery;
