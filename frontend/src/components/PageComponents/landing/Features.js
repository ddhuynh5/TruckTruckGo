import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Truck from "../../../assets/images/truck_drive.jpg";
import Dislike from "../../../assets/images/sad.jpg";
import Shopping from "../../../assets/images/shop.jpg";

export default function Features() {

    const [tab, setTab] = useState(1)

    const tabs = useRef(null)

    const heightFix = () => {
        if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
    }

    useEffect(() => {
        heightFix()
    }, [])

    return (
        <section className="relative">
            <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-18" aria-hidden="true" />
            <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-12 md:pt-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 className="text-3xl md:text-2xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                            What we offer
                        </h2>
                        <p className="text-xl text-gray-600">
                            Explore our comprehensive suite of services designed to enhance your everyday experience, on and off the road.
                        </p>
                    </div>
                    <div className="md:grid md:grid-cols-12 md:gap-6">
                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
                            <div className="mb-8 md:mb-0">
                                <a
                                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"}`}
                                    href="#0"
                                    onClick={(e) => { e.preventDefault(); setTab(1); }}
                                >
                                    <div>
                                        <div className="font-bold leading-snug tracking-tight mb-1">Find and buy your next favorite item!</div>
                                        <div className="text-gray-600">
                                            Easily find everything you need with our item lookup and purchasing features. Our user-friendly interface and
                                            streamlined checkout process makes shopping with us a breeze.
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                                        </svg>
                                    </div>
                                </a>
                                <a
                                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"}`}
                                    href="#0"
                                    onClick={(e) => { e.preventDefault(); setTab(2); }}
                                >
                                    <div>
                                        <div className="font-bold leading-snug tracking-tight mb-1">Drive Safer and Earn Points!</div>
                                        <div className="text-gray-600">
                                            Earn points for safe driving and redeem them for rewards from our extensive catalog.
                                            Join our community today and experience the benefits of our exciting points program!
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" fillRule="nonzero" />
                                        </svg>
                                    </div>
                                </a>
                                <a
                                    className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? "bg-white shadow-md border-gray-200 hover:shadow-lg" : "bg-gray-200 border-transparent"}`}
                                    href="#0"
                                    onClick={(e) => { e.preventDefault(); setTab(3); }}
                                >
                                    <div>
                                        <div className="font-bold leading-snug tracking-tight mb-1">Don't Like What You See?</div>
                                        <div className="text-gray-600">
                                            Get the help you need with our 24/7 support services.
                                            Reach out today to experience our world-class support team that is always ready to listen and assist you.
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z" fill="#191919" fillRule="nonzero" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
                            <div className="transition-all">
                                <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                                    <Transition
                                        show={tab === 1}
                                        appear={true}
                                        className="w-full"
                                        enter="transition ease-in-out duration-700 transform order-first"
                                        enterFrom="opacity-0 translate-y-16"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in-out duration-300 transform absolute"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 -translate-y-16"
                                        beforeEnter={() => heightFix()}
                                        unmount={false}
                                    >
                                        <div className="relative inline-flex flex-col mb-4">
                                            <img className="md:max-w-none mx-auto rounded" src={Shopping} width={500} height="462" alt="shop" />
                                        </div>
                                    </Transition>
                                    <Transition
                                        show={tab === 2}
                                        appear={true}
                                        className="w-full"
                                        enter="transition ease-in-out duration-700 transform order-first"
                                        enterFrom="opacity-0 translate-y-16"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in-out duration-300 transform absolute"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 -translate-y-16"
                                        beforeEnter={() => heightFix()}
                                        unmount={false}
                                    >
                                        <div className="relative inline-flex flex-col">
                                            <img className="md:max-w-none mx-auto rounded" src={Truck} width={500} height="462" alt="truck" />
                                        </div>
                                    </Transition>
                                    <Transition
                                        show={tab === 3}
                                        appear={true}
                                        className="w-full"
                                        enter="transition ease-in-out duration-700 transform order-first"
                                        enterFrom="opacity-0 translate-y-16"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in-out duration-300 transform absolute"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 -translate-y-16"
                                        beforeEnter={() => heightFix()}
                                        unmount={false}
                                    >
                                        <div className="relative inline-flex flex-col">
                                            <img className="md:max-w-none mx-auto rounded" src={Dislike} width={500} height="462" alt="dislike" />
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}