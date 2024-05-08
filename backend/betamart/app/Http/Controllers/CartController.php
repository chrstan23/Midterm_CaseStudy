<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::all();
        return response()->json($carts);
    }

    public function show($id)
    {
        $cart = Cart::findOrFail($id);
        return response()->json($cart);
    }

    public function store(Request $request)
    {
        // Check if the product already exists in the cart
        $cartItem = Cart::where('product_id', $request->product_id)->first();

        if ($cartItem) {
            // If the product exists, update the quantity by adding the new quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // If the product does not exist, create a new cart item
            Cart::create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Product added to cart successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);
        $cart->quantity = $request->input('quantity');
        $cart->save();

        return response()->json(['message' => 'Cart item updated successfully', 'cart' => $cart]);
    }

    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();
        return response()->json(['message' => 'Cart removed successfully']);
    }

    public function removeAll()
    {
        Cart::truncate();
        return response()->json(['message' => 'All carts removed successfully']);
    }
}
