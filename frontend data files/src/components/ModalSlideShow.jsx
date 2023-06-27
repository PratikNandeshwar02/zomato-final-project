import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ModalSlideShow = ({restaurant}) => {
  return (
    <main>
        {/* modal slideshow */}
        <section className="container-fluid " style={{ height: "15vh"}}>
            <div className="modal fade" id="RestMenuSlideShow"  tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content ">
                        <Carousel showThumbs={true} infiniteLoop={true} autoPlay={true}>
                            {   restaurant.thumb ?
                                restaurant.thumb.map((value, index)=>{
                                    return <div key={index} className="img-fluid">
                                        <img src={value} alt="" />
                                    </div> 
                                }) :null
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    {/* modal slideshow */}
    </main>
  )
}
export default ModalSlideShow;