import { NextRequest, NextResponse } from 'next/server';
import { discourseAPI } from '../../../../../api/discourse';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const topicId = parseInt(resolvedParams.id);

  if (isNaN(topicId)) {
    return NextResponse.json(
      { success: false, error: 'Invalid topic ID' },
      { status: 400 }
    );
  }

  try {
    const result = await discourseAPI.getTopic(topicId);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
