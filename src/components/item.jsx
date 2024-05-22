import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {useRef, useState } from "react"
import '../item.css'

const Item = (...propes) => {
  const [isHover , setIsHover] = useState(false)
  const imageRef = useRef()
  const parentRef = useRef()
  const h1Ref = useRef()
  const {x,y,text,img , idx} = propes[0]

  useGSAP( () => {
    if(isHover) {
      gsap.to(imageRef.current, {
        duration: .5,
        scale: 1.1,
        ease: 'power4.out',
      })
      gsap.to(h1Ref.current, {
        duration: .5,
        opacity:1,
        ease: 'power4.out',
      })
    } else {
      gsap.to(imageRef.current, {
        duration: .5,
        scale: 1,
        ease: 'power3.in',
      })
      gsap.to(h1Ref.current, {
        duration: .5,
        opacity:0,
        ease: 'power4.out',
      })
    }
  } , [isHover])

  return (
    <div
      key={text}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={parentRef}
      style={
            {
                position: 'absolute',
                left:x+ '%',
                top:y + '%',
                transform:`translate(-50% , -50%)`,
                overflow:'hidden',
            }
        } 
     className="elem"
     >
      <h1
       ref={h1Ref}
        style={
          {
            color:'white',
            position: 'absolute',
            top:'50%',
            left:'50%',
            transform:`translate(-50% , -50%)`,
            zIndex:100,
            fontFamily:'sans-serif',
            textTransform:'uppercase',
            opacity:0,
            fontSize:'4vw',
            mixBlendMode:'difference'
          }
        }>
        {text}
      </h1>
        <img
          style={
            {
              height:'100%',
              width:'100%',
              objectFit:'cover'
            }
          }
          className="item image"
          ref={imageRef}
          src={img} alt="" />
  </div>
    )
}

export default Item