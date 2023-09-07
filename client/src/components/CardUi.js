import React, { useEffect, useState } from 'react';
import './CardUi.css';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import { Card, CardFooter,  CardPreview} from "@fluentui/react-components/unstable";
import {  Button, Text } from "@fluentui/react-components";
const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const CardUi = () => {
 
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <div className='container'>
     {todos.map(fluent => (
    <div className='fluent-card' key={fluent.fluent_id} style={{width:'20rem'}}>
    <Card>
    
    <CardPreview >
      <img src={fluent.src} alt="Preview of a Word document " style={{height:'10rem'}}/>
    </CardPreview>
    
    <Text block weight="semibold" style={{fontSize:'1.2rem'}}>
         {fluent.title}
    </Text>
    <span>
        {fluent.description}
    </span>
     <CardFooter>
      <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
      <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
    </CardFooter> 
  </Card>
  </div>
   ))}
  </div>
  )
}

export default CardUi;