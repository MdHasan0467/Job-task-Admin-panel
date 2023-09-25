import axios from "axios";


// ! ..........  Image upload .......... 
export const handleImgBBUpload = async (image) => {
    try {
        const formData = new FormData()

        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=690c200c36211dbbf9634dc12eadb291`
            
        const response = await axios.post(url, formData);
        const data = await response.data

        return data.data.display_url
    } 
    catch (error) {
            console.error(error)
    }
}