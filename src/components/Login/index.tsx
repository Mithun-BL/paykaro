import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-10 ">
                        <div className="col-span-6">
                            <div className="bg-white p-4 rounded-md">
                                <h1 className="text-xl font-bold">Payments that just work.</h1>
                                <p className="text-sm font-bold">Accept UPI, cards and net banking in one flow, track every rupee in real time, and give your customers a checkout they trust.</p>
                                <ul className="mt-10">
                                    <li className="mb-2 flex items-center gap-2">
                                        {/* <Image src="/svg/check.svg" alt="check" width={12} height={12} /> */}
                                        PCI-DSS compliant infrastructure
                                    </li>
                                    <li className="mb-2 flex items-center gap-2">
                                        {/* <Image src="/svg/check.svg" alt="check" width={12} height={12} /> */}
                                        256-bit end-to-end encryption
                                    </li>
                                    <li className="mb-2 flex items-center gap-2">
                                        {/* <Image src="/svg/check.svg" alt="check" width={12} height={12} /> */}
                                        Powered by Razorpay's payment network
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-span-6">
                            <div className='bg-white rounded-[12px] p-8 max-w-[500px] mx-auto shadow-2xl'>
                                <h2 className='text-center text-xl font-bold mb-5'>Welcome Back</h2>
                                <p className='text-center text-sm font-bold mb-5'>Log in to your PayKaro account to continue.</p>
                                <form>
                                    <div className='mb-6'>
                                        <label className='block mb-2' htmlFor="email">Email Address</label>
                                        <input className='border-[1px] border-black block w-full py-2 px-4' type="email" id="email" name="email" placeholder='Enter your email' />
                                    </div>

                                    <div className='mb-6'>
                                        <label className='block mb-2' htmlFor="password">Password</label>
                                        <input className='border-[1px] border-black block w-full py-2 px-4' type="password" id="password" name="password" placeholder='Enter your password' />
                                    </div>

                                    <div className="flex justify-between mb-6">
                                        <div className="flex ">
                                            <input className='mr-3' type="checkbox" id="remember" name="remember" />
                                            <label htmlFor="remember">Remember me</label>
                                        </div>
                                        <Link href="/forgot-password" className='text-blue-500 font-semibold text-sm'>Forgot Password?</Link>
                                    </div>

                                    <button className='bg-[#2874F0] text-white py-2 px-6 w-full rounded-[8px]' type="submit">Login</button>
                                </form>

                            </div>

                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}