//import './directory-item.styles.jsx';

import { BackgroundImage , Body, DirectoryItemContainer} from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category})=>{
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(category.route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage  
             imageUrl={category.imageUrl}
             />
        <Body>
          <h2>{category.title}</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer> 
    )
}

export default DirectoryItem;