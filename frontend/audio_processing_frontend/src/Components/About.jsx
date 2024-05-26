import React from 'react'
import '../App.css'


const About = () => {
  return (
    <div className='container'>

      <div className='container d-flex justify-content-center mt-4'>
        <pre className='fs-1 fw-bold'>ABOUT  OUR  PROJECT</pre>
      </div>
      
      {/* ---------------------- Blog 001 ---------------------- */}
      <div className="card my-4 bg_card_color my-5 mt-3">
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
            <div className="card-body col-md-4">
                <h5 className="card-title ProjectsTag fs-2 fw-bold">Objective</h5>
                <p className="card-text fs-5">Our project focuses on the development of an advanced overlapped speech separation system aimed at extracting individual speech signals from overlapping audio sources. We aim to address the significant challenge of separating speech signals when multiple speakers are talking simultaneously, which is crucial for various real-world applications.</p>
            </div>
            <div className="card col-md-8 imgCard">
                <img src="/fyp_pic_001.jpg" className="card-img-top" alt="/cloudbook_ss_3.png" />
            </div>
        </div>
      </div>


      {/* ---------------------- Blog 002 ---------------------- */}
      <div className="card my-4 bg_card_color my-5">
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
            <div className="card-body col-md-4 order-md-2">
                <h5 className="card-title ProjectsTag fs-2 fw-bold">Proposed Solution</h5>
                <p className="card-text fs-5">Our overlapped speech separation system employs innovative signal processing techniques and machine learning algorithms to separate overlapping speech signals. By analyzing the temporal and spectral characteristics of the audio signals, our system can effectively separate and extract individual speech components, even in complex overlapping scenarios.</p>
            </div>
            <div className="card col-md-8 imgCard order-md-1">
                <img src="/fyp_pic_002.jpg" className="card-img-top" alt="/cloudbook_ss_3.png" />
            </div>
        </div>
      </div>



      {/* ---------------------- Blog 003 ---------------------- */}
      <div className="card my-4 bg_card_color my-5">
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
            <div className="card-body col-md-4">
                <h5 className="card-title ProjectsTag fs-2 fw-bold">Technologies Used</h5>
                <p className="card-text fs-5">Our system is implemented using Python programming language, utilizing libraries such as TensorFlow and PyTorch for machine learning tasks. We leverage digital signal processing <code>DSP</code> techniques and deep learning architectures to achieve high-performance speech separation capabilities.</p>
            </div>
            <div className="card col-md-8 imgCard">
                <img src="/fyp_pic_003.jpg" className="card-img-top" alt="/cloudbook_ss_3.png" />
            </div>
        </div>
      </div>


      {/* ---------------------- Blog 004 ---------------------- */}
      <div className="card my-4 bg_card_color my-5">
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
            <div className="card-body col-md-4 order-md-2">
                <h5 className="card-title ProjectsTag fs-2 fw-bold">Future Work</h5>
                <p className="card-text fs-5">In the future, we plan to further enhance the capabilities of our system by exploring advanced signal processing techniques and incorporating feedback from real-world deployments. We also aim to extend the applicability of our system to new domains and scenarios through continuous research and development efforts.</p>
            </div>
            <div className="card col-md-8 imgCard order-md-1">
                <img src="/fyp_pic_004.jpg" className="card-img-top" alt="/cloudbook_ss_3.png" />
            </div>
        </div>
      </div>


    </div>
  )
}

export default About
