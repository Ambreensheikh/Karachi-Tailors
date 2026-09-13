import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  service?: string;
  status: 'pending' | 'approved' | 'blocked';
  ip?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 10, //  spam control
    },

    service: {
      type: String,
      default: 'Custom Tailoring',
      trim: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'blocked'],
      default: 'pending',
      index: true, //  fast filtering
    },

    ip: {
      type: String, //  optional spam tracking
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent model overwrite (Next.js fix)
const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;