import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  category: string;
  mediaUrl: string;
  publicId: string;
  mediaType: 'image' | 'video';
  altText: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a dress title'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: [
        'Bridal Wear',
        'Party Wear',
        'Modern Wear',
        'SaariBlouse',
        'Alterations',
        'Formal',
        'Wedding Gowns',
        'Casual',
      ],
      default: 'Bridal Wear',
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required'],
    },
    publicId: {
      type: String,
      required: [true, 'Cloudinary Public ID is required'],
      unique: true,
      index: true,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for SEO'],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Next.js hot-reloading model overwrite error fix
const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;