
import bg from './assets/images/bg.jpg'


function App() {


  return (
    <>
      <div className='flex flex-col items-center p-2 justify-center h-screen w-full'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >

        <div className='bg-black/30 p-10 backdrop-blur-3xl rounded-lg shadow-lg'>
          <h1 className='text-4xl text-white font-bold mb-4 text-center'>
            Welcome to Recykroute
          </h1>
          <p className='text-lg mb-6 text-gray-200 text-center'>Your ultimate recycling route planner</p>

          <div className='flex items-center justify-center  space-x-4'>

            <button className='bg-blue-500 text-white px-8 py-2 cursor-pointer rounded hover:bg-blue-600 transition'>
              Get Started
            </button>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
