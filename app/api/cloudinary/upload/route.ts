import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Handles server-side direct image upload to Cloudinary.
 * Accepts a base64 encoded image string or image URL and uploads to Cloudinary storage.
 *
 * @param {Request} request - HTTP request object containing image data in JSON body.
 * @returns {Promise<NextResponse>} JSON response containing secure_url and public_id.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { image, folder = 'shivansh-rose-nursery/products' } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Image file or base64 data string is required.' },
        { status: 400 }
      );
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: 'auto',
      quality: 'auto:good',
      fetch_format: 'auto',
    });

    return NextResponse.json({
      success: true,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: any) {
    console.error('Cloudinary Direct Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image to Cloudinary.' },
      { status: 500 }
    );
  }
}
