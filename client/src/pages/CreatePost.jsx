import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        key: '',
        name: '',
        prompt: '',
        photo: '',
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const generateImage = async() => {
        if(form.prompt){
            try {
                setGeneratingImg(true);
                const response = await fetch('https://dream-vision-backend.vercel.app/api/v1/dalle',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt, key: form.key }),
                })
                const data = await response.json();
                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else{
            alert('Please enter a prompt');
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(form.prompt && form.photo){
            setLoading(true);
            try {
                const response = await fetch('https://dream-vision-backend.vercel.app/api/v1/post',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                await response.json();
                navigate('/');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter a prompt and generate an image');
        }
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt:randomPrompt})
    }
    return(
        <section className='max-w-7xl mx-auto'> 
            <div>
                <h1 className='font-inter font-extrabold text-[#ffffff] text-[50px]'>
                    CREATE !
                </h1>
                <p className='font-inter font-semibold mt-2 text-[#ffffff] text-[28px] max-w[500px]'>
                Use the renowned DALL-E AI through <span className='font-inter font-extrabold text-[#0096c7]'>DreamVision</span> to produce awe-inspiring and imaginative images, and distribute your creations within our thriving community of artists and enthusiasts.<span className='text-[#0096c7]'></span>
                </p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField labelName="Your API Key" type="password" name="key" value={form.key} handleChange={handleChange}/>
                    <FormField labelName="Your Name" type="text" name="name" placeholder="John Doe" value={form.name} handleChange={handleChange}/>
                    <FormField labelName="Prompt" type="text" name="prompt" placeholder="A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm" value={form.prompt} handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe}/>
                    <div className='relative border-[4px] border-[#0096c7] text-gray-900 text-sm rounded-lg focus:ring-[#0096c7] focus:border-[#0096c7] w-64 p-3 h-64 flex justify-center items-center'>
                        {form.photo ? (<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>) : (<img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40'/>)}
                        {generatingImg && (
                            // bg-[rgba(0,0,0,0.5)]
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-transparent rounded-lg'>
                                <Loader/>
                            </div>
                        )}
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button type='button' onClick={generateImage} className='bg-[#0096c7] border border-[#0096c7] font-extrabold font-inter rounded-md text-white text-[20px] w-full sm:w-auto px-5 py-2.5 text-center'>
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className='mt-10 font-inter font-extrabold text-[23px] '>
                    <p>Once you have created the image, if you want, you can share it with others in the community.</p>
                    <button type='submit' className='mt-3 text-white bg-[#0096c7] font-extrabold font-inter rounded-md text-[20px] w-full sm:w-auto px-5 py-2.5 text-center'>
                        {loading ? 'Sharing...' : 'Share with the community'}
                    </button>
                </div>
            </form>
        </section>
    )
}
export default CreatePost