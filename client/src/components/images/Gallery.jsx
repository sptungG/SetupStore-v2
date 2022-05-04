import React from "react";
import { Image, Skeleton, List, Card } from "antd";
import axios from "axios";

const Gallery = ({count = 9, column = 3}) => {
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
      // loadPhotos();
  }, []);

  return (
    <>
      {photos.length === 0 || loading ? (
        <List
          id="gallery"
          grid={{ gutter: [24, 24], column: column }}
          dataSource={Array(count).fill(null)}
          rowKey={(item) => item}
          renderItem={(item) => (
            <List.Item key={item} style={{ margin: 0 }}>
              <Card id="skeleton">
                <Skeleton active></Skeleton>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <List
          id="gallery"
          grid={{ gutter: 24, column: column }}
          dataSource={photos}
          rowKey={(item) => item.id}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Image width={"100%"} height={"100%"} src={item.urls.regular} alt={item.id} />
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default Gallery;
