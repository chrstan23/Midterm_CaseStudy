<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Add this line

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sample products and descriptions
        $products = [
            ['id' => 1, 'name' => 'Toyota Corolla', 'price' => '1000000.00', 'description' => 'Automobile'],
            ['id' => 2, 'name' => 'Ford F-150', 'price' => '1750000.00', 'description' => 'Automobile'],
            ['id' => 3, 'name' => 'Toyota Camry', 'price' => '1250000.00', 'description' => 'Automobile'],
            ['id' => 4, 'name' => 'Honda Accord', 'price' => '1500000.00', 'description' => 'Automobile'],
            ['id' => 5, 'name' => 'Toyota Vios', 'price' => '1100000.00', 'description' => 'Automobile'],
            ['id' => 6, 'name' => 'Honda Civic', 'price' => '1400000.00', 'description' => 'Automobile'],
            ['id' => 7, 'name' => 'Honda Supremo', 'price' => '300000.00', 'description' => 'Motorcycle'],
            ['id' => 8, 'name' => 'Nissan Rogue', 'price' => '1400000.00', 'description' => 'Automobile'],
            ['id' => 9, 'name' => 'Ford Mustang', 'price' => '2250000.00', 'description' => 'Automobile'],
            ['id' => 10, 'name' => 'Chevrolet Silverado 1500', 'price' => '2000000.00', 'description' => 'Automobile'],
        ];

        // Create each product using the factory
        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'] // Random price between 10 and 100 with 2 decimal places
            ]);
        }
    }
}
