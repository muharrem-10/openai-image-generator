const  Configuration = require('openai')   // bu şekilde yazılmalı yoksa bu hata alınır: TypeError: Configuration is not a constructor
const OpenAIApi  = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);


const generateImage = async (req, res) => {

    const { prompt, size } = req.body

    const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';


  try {
    const image = await openai.images.generate({ 
        prompt,
        n: 1,
        size: imageSize
        })

    // const response = await openai.createImage({
    //   prompt: 'Polar bear on ice skates',
    //   n: 1, 
    //   size: '512x512',
    // })

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };