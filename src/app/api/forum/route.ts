import { NextRequest, NextResponse } from 'next/server';
import { discourseAPI } from '../../../api/discourse';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || '';
  const query = searchParams.get('query') || '';

  try {
    switch (action) {
      case 'topics':
        const topics = await discourseAPI.getLatestTopics(limit);
        return NextResponse.json({ success: true, data: topics });

      case 'category':
        if (!category) {
          return NextResponse.json({ success: false, error: 'Category parameter required' }, { status: 400 });
        }
        const categoryTopics = await discourseAPI.getCategoryTopics(category, limit);
        return NextResponse.json({ success: true, data: categoryTopics });

      case 'search':
        if (!query) {
          return NextResponse.json({ success: false, error: 'Query parameter required' }, { status: 400 });
        }
        const searchResults = await discourseAPI.search(query, limit);
        return NextResponse.json({ success: true, data: searchResults });

      case 'categories':
        const categories = await discourseAPI.getCategories();
        return NextResponse.json({ success: true, data: categories });

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
