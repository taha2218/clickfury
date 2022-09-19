import './directory.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component';

const categories = [
    {
      id: 1,
      title: "HATS",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      route: 'shop/hats'
    },
    {
      id: 2,
      title: "JACKETS",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      route: 'shop/jackets'
    },
    {
      id: 3,
      title: "SNEAKERS",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      route: 'shop/sneakers'
    },
    {
      id: 4,
      title: "WOMENS",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      route: 'shop/women'
    },
    {
      id: 5,
      title: "MENS",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      route: 'shop/men'
    },
  ];


const Directory = () => {
    return(
        <div className="directory-container">
            {categories.map((category) => (
            <DirectoryItem category = {category} key={category.id} />
         ))}
    </div>
    );
}

export default Directory;