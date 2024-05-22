import { useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Item from "./components/item";
import {data} from '../data.js'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [isNavActive , setIsNavActive] = useState(false)
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)
  const [mouseDets, setMouseDets] = useState({x:0,y:0})

  const parallexDiv = useRef()
  const mouseDiv = useRef()

  const handleMove = e => {
    const x = e.clientX 
    const y = e.clientY
    setMouseDets({x,y})
    const transX = (((x - (innerWidth / 2)) /( innerWidth / 2)) * -100) / 2
    const transY = (((y - (innerHeight / 2)) /( innerHeight / 2)) * -100) / 3
    setMoveX(transX)
    setMoveY(transY)
  }

  useGSAP(() => {
    gsap.to(parallexDiv.current , {
      x:moveX + 'vw',
      y:moveY + 'vw',
      duration:1,
      ease:'power3.inout'
    })
    gsap.to(mouseDiv.current , {
      x:mouseDets.x ,
      y:mouseDets.y,
      duration:.3,
      // ease:'power3.in'
    })
  },[moveX , moveY , mouseDets])

  useEffect(() => {
    window.addEventListener('mousemove' , handleMove)
    return () => {
      window.removeEventListener('mousemove' , handleMove)
    }
  }, [])

  
  

  return (
    <main>
      <div
        ref={mouseDiv}
        className="custom-mouse"></div>
      <nav>
        <h1>keepgrading</h1>
        <div
          onClick={() => setIsNavActive(!isNavActive)}
          className="menu">
          <div className={`line ${isNavActive ? 'active' : ' '}`}></div>
          <div className={`line ${isNavActive ? 'active' : ' '}`}></div>
        </div>
      </nav>
      <div
        className="background">
        <div
          ref={parallexDiv}
          
        className="content">
         {
          data.map((e , i) => {
            return <> 
              <Item idx={i} text={e.text} x={e.x} y={e.y} img={e.img} />
            </>
          })
         }
        </div>
      </div>
    </main>
  );
}

export default App;
