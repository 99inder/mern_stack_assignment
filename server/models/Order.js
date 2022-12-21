import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderinfo: [
        {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],

    shipinfo: {
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    total_qty: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('order', OrdersSchema);