import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SplideSlide, Splide } from '@splidejs/react-splide';


function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

    useEffect(() => {
      getCuisine(params.type);
    }, [params.type]);

    return (
        <Wrapper
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
          <Splide options={{perPage: 4, arrows: false, pagination: false, drag: 'free', gap: "5rem"}}>
            {cuisine.map((item) => {
              return (
                <SplideSlide  key={item.id}>
                  <Card>
                    <Link to={'/recipe/'+item.id}>
                      <p>{item.title}</p>
                      <img src={item.image} alt="" />
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
          </Splide>
        </Wrapper>
    );
          
  }


const Wrapper = styled(motion.div)`
margin: 4rem 0rem;
`;

const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;
position: relative;
img 
{ 
  border-radius: 2rem; 
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p
{
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%; 
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Cuisine;