<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VideoController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query', '');
        $locale = $request->input('locale', 'en-US');
        $size = $request->input('size');
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 16);

        $response = Http::withHeaders([
            'Authorization' => config('services.pexels.key'),
        ])->get('https://api.pexels.com/videos/search', [
            'query' => $query,
            'locale' => $locale,
            'size' => $size,
            'page' => $page,
            'per_page' => $perPage,
        ]);

        $data = $response->json();

        $items = collect($data['videos'] ?? [])->map(function ($video) {
            return [
                'id' => $video['id'],
                'width' => $video['width'],
                'height' => $video['height'],
                'duration' => $video['duration'],
                'user_name' => $video['user']['name'],
                'video_files' => $video['video_files'],
                'video_pictures' => $video['video_pictures'],
            ];
        });

        return response()->json([
            'items' => $items,
            'page' => $data['page'] ?? $page,
            'per_page' => $data['per_page'] ?? $perPage,
            'total_results' => $data['total_results'] ?? 0,
            'total_pages' => ceil(($data['total_results'] ?? 0) / $perPage),
        ]);
    }
}
