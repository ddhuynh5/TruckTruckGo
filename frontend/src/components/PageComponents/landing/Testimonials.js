import Jeff from "../../../assets/images/jeff.jpg";
import Bill from "../../../assets/images/bill.jpg";
import Ted from "../../../assets/images/truckdriver2.jpg";

export default function Testimonials() {
    return (
        <section className="relative">
            <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 className="h2 mb-4 text-3xl md:text-4xl font-extrabold">Trusted by over 20,000 truck drivers all over the world</h2>
                        <p className="text-xl text-gray-600" data-aos="zoom-y-out">
                            Join our global community of over 20,000 trusted truck drivers.
                        </p>
                    </div>
                    <div className="max-w-sm md:max-w-6xl mx-auto md:grid gap-10 grid-cols-3 md:grid-cols-3 mt-10">
                        <div className="max-w-3xl mx-auto" data-aos="zoom-y-out">
                            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">

                                <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                                    <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                                        <img className="relative rounded" src={Bill} width={150} height="462" alt="Bill" />
                                    </div>
                                    <blockquote className="text-xl font-medium mb-4 mt-4">
                                        “ I love using the TruckTruckGo app. It has made me a safer and more aware driver, and the rewards are amazing too! Thank you! “
                                    </blockquote>
                                    <cite className="block font-bold text-lg not-italic mb-1">Bill Turner</cite>
                                    <div className="text-gray-600">
                                        <span>Driver</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto" data-aos="zoom-y-out">
                            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">
                                <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                                    <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                                        <img className="relative rounded" src={Jeff} width={400} height="462" alt="Jeff" />
                                    </div>
                                    <blockquote className="text-xl font-medium mb-4 mt-4">
                                        “ We've been thrilled to partner with TruckTruckGo and proud to support a product that makes our roads safer for everyone. “
                                    </blockquote>
                                    <cite className="block font-bold text-lg not-italic mb-1">Jeff</cite>
                                    <div className="text-gray-600">
                                        <span>CEO of a famous company</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto" data-aos="zoom-y-out">
                            <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">
                                <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                                    <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                                        <img className="relative rounded" src={Ted} width={200} height="462" alt="Ted" />
                                    </div>
                                    <blockquote className="text-xl font-medium mb-4 mt-4">
                                        “ TruckTruckGo is a game-changer for me. It's helped me become a more conscientious driver and I feel much safer on the road now. “
                                    </blockquote>
                                    <cite className="block font-bold text-lg not-italic mb-1">Ted Stewart</cite>
                                    <div className="text-gray-600">
                                        <span>Driver</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}