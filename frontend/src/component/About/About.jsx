import { RiHeadphoneLine, RiLockLine, RiTruckFill } from "react-icons/ri";
import about from '../../assets/img/about.png'


const About=() =>{
  return (
    <section className="max-padd-container py-12 xl:py-32">
        <div className="flex flex-col gap-16 xl:gap-8 xl:flex-row">
            {/* content */}
            <div className="flex-1">
                {/* title div */}
                <div>
                    <h3 className="h3 capitalize">
                        Unveiling Our Product's Key Features!
                    </h3>
                    <p className="py-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dolorum at, nostrum quo labore iure illo dignissimos vitae aliquam a possimus laborum, ea ad optio delectus? Beatae esse sint voluptatibus?</p>
                </div>
                {/* content div */}
                <div className="flex flex-col items-start gap-y-4">
                    <div className="flexCenter gap-x-4">
                        <div className="flexCenter h-16 min-w-16  bg-secondary  rounded-md">
                            <RiTruckFill className="text-white text-2xl"/>
                        </div>
                        <div>
                            <h4 className="medium-18">
                                Easy Returns Process
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore unde maiores ratione placeat tempora quisquam exercitationem nulla!
                            </p>
                        </div>
                    </div>
                    <div className="flexCenter gap-x-4">
                        <div className="flexCenter h-16 min-w-16  bg-secondary  rounded-md">
                            <RiLockLine className="text-white text-2xl"/>
                        </div>
                        <div>
                            <h4 className="medium-18">
                                Secure Payment Options
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore unde maiores ratione placeat tempora quisquam exercitationem nulla!
                            </p>
                        </div>
                    </div>
                    <div className="flexCenter gap-x-4">
                        <div className="flexCenter  h-16 min-w-16  bg-secondary  rounded-md">
                            <RiHeadphoneLine className="text-white text-2xl"/>
                        </div>
                        <div>
                            <h4 className="medium-18">
                                Live Customer Support
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore unde maiores ratione placeat tempora quisquam exercitationem nulla!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* image */}
            <div className="flex-1 flexCenter">
                <img src={about} alt="about" height={488} width={488} />
            </div>
        </div>
    </section>
  )
}

export default About
