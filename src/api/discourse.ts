/**
 * Discourse API Client for timetravelinstitute.com
 * Based on https://docs.discourse.org/ API documentation
 */

export interface DiscourseTopic {
  id: number;
  title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: boolean;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean;
  liked: boolean;
  tags: string[];
  like_count: number;
  views: number;
  category_id: number;
  featured_link: string | null;
  has_accepted_answer: boolean;
}

export interface DiscoursePost {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: string;
  cooked: string;
  post_number: number;
  post_type: number;
  updated_at: string;
  reply_count: number;
  reply_to_post_number: number | null;
  quote_count: number;
  incoming_link_count: number;
  reads: number;
  score: number;
  yours: boolean;
  topic_id: number;
  topic_slug: string;
  display_username: string;
  primary_group_name: string | null;
  flair_name: string | null;
  flair_url: string | null;
  flair_bg_color: string | null;
  flair_color: string | null;
  version: number;
  can_edit: boolean;
  can_delete: boolean;
  can_recover: boolean;
  can_wiki: boolean;
  read: boolean;
  user_title: string | null;
  bookmarked: boolean;
  raw: string;
  actions_summary: Array<{
    id: number;
    count: number;
    hidden: boolean;
    can_act: boolean;
  }>;
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  user_id: number;
  draft_sequence: number;
  hidden: boolean;
  trust_level: number;
  deleted_at: string | null;
  user_deleted: boolean;
  edit_reason: string | null;
  can_view_edit_history: boolean;
  wiki: boolean;
  reviewable_id: number | null;
  reviewable_score_count: number;
  reviewable_score_pending_count: number;
}

export interface DiscourseCategory {
  id: number;
  name: string;
  color: string;
  text_color: string;
  slug: string;
  topic_count: number;
  post_count: number;
  position: number;
  description: string;
  description_text: string;
  description_excerpt: string;
  topic_url: string | null;
  read_restricted: boolean;
  permission: number | null;
  notification_level: number | null;
  topic_template: string | null;
  has_children: boolean;
  sort_order: string | null;
  sort_ascending: string | null;
  show_subcategory_list: boolean;
  num_featured_topics: number;
  default_view: string | null;
  subcategory_list_style: string | null;
  default_top_period: string | null;
  minimum_required_tags: number;
  navigate_to_first_post_after_read: boolean;
  uploaded_logo: string | null;
  uploaded_background: string | null;
}

export interface DiscourseSearchResult {
  posts: Array<{
    id: number;
    name: string;
    username: string;
    avatar_template: string;
    created_at: string;
    like_count: number;
    blurb: string;
    post_number: number;
    topic_id: number;
    topic_slug: string;
    topic_title: string;
    category_id: number;
    display_username: string;
  }>;
  topics: Array<{
    id: number;
    title: string;
    slug: string;
    posts_count: number;
    reply_count: number;
    highest_post_number: number;
    created_at: string;
    last_posted_at: string;
    bumped: boolean;
    bumped_at: string;
    archetype: string;
    unseen: boolean;
    pinned: boolean;
    unpinned: boolean;
    visible: boolean;
    closed: boolean;
    archived: boolean;
    bookmarked: boolean;
    liked: boolean;
    tags: string[];
    like_count: number;
    views: number;
    category_id: number;
    featured_link: string | null;
    has_accepted_answer: boolean;
  }>;
  categories: Array<{
    id: number;
    name: string;
    color: string;
    text_color: string;
    slug: string;
    topic_count: number;
    post_count: number;
    position: number;
    description: string;
    read_restricted: boolean;
    permission: number | null;
    notification_level: number | null;
    has_children: boolean;
    sort_order: string | null;
    sort_ascending: string | null;
    show_subcategory_list: boolean;
    num_featured_topics: number;
    default_view: string | null;
    subcategory_list_style: string | null;
    default_top_period: string | null;
    minimum_required_tags: number;
    navigate_to_first_post_after_read: boolean;
  }>;
  users: Array<{
    id: number;
    username: string;
    name: string;
    avatar_template: string;
    created_at: string;
    last_seen_at: string;
    last_posted_at: string;
    post_count: number;
    primary_group_name: string | null;
    flair_name: string | null;
    flair_url: string | null;
    flair_bg_color: string | null;
    flair_color: string | null;
    moderator: boolean;
    admin: boolean;
    staff: boolean;
    trust_level: number;
  }>;
}

export class DiscourseAPI {
  private baseUrl: string;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private cacheTimeout: number;

  constructor(baseUrl: string = 'https://timetravelinstitute.com') {
    this.baseUrl = baseUrl;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get latest topics from the forum
   */
  async getLatestTopics(limit: number = 20): Promise<DiscourseTopic[]> {
    const cacheKey = `latest_topics_${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached as DiscourseTopic[];

    try {
      const response = await fetch(`${this.baseUrl}/latest.json?limit=${limit}&order=activity`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const topics = data.topic_list?.topics || [];
      
      this.setCached(cacheKey, topics);
      return topics;
    } catch (error) {
      console.error('Error fetching latest topics:', error);
      return [];
    }
  }

  /**
   * Get topics from a specific category
   */
  async getCategoryTopics(categorySlug: string, limit: number = 20): Promise<DiscourseTopic[]> {
    const cacheKey = `category_${categorySlug}_${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached as DiscourseTopic[];

    try {
      const response = await fetch(`${this.baseUrl}/c/${categorySlug}/l/latest.json?limit=${limit}&order=activity`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const topics = data.topic_list?.topics || [];
      
      this.setCached(cacheKey, topics);
      return topics;
    } catch (error) {
      console.error(`Error fetching topics for category ${categorySlug}:`, error);
      return [];
    }
  }

  /**
   * Get a specific topic with its posts
   */
  async getTopic(topicId: number): Promise<{ topic: DiscourseTopic; posts: DiscoursePost[] } | null> {
    const cacheKey = `topic_${topicId}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached as { topic: DiscourseTopic; posts: DiscoursePost[] };

    try {
      const response = await fetch(`${this.baseUrl}/t/${topicId}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const result = {
        topic: data,
        posts: data.post_stream?.posts || []
      };
      
      this.setCached(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error fetching topic ${topicId}:`, error);
      return null;
    }
  }

  /**
   * Search the forum
   */
  async search(query: string, limit: number = 20): Promise<DiscourseSearchResult> {
    const cacheKey = `search_${query}_${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached as DiscourseSearchResult;

    try {
      const response = await fetch(`${this.baseUrl}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
      return { posts: [], topics: [], categories: [], users: [] };
    }
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<DiscourseCategory[]> {
    const cacheKey = 'categories';
    const cached = this.getCached(cacheKey);
    if (cached) return cached as DiscourseCategory[];

    try {
      const response = await fetch(`${this.baseUrl}/categories.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const categories = data.category_list?.categories || [];
      
      this.setCached(cacheKey, categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Get user profile
   */
  async getUser(username: string): Promise<Record<string, unknown> | null> {
    const cacheKey = `user_${username}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached as Record<string, unknown>;

    try {
      const response = await fetch(`${this.baseUrl}/u/${username}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error fetching user ${username}:`, error);
      return null;
    }
  }

  /**
   * Get cached data if it exists and is not expired
   */
  private getCached(key: string): unknown {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Set cached data
   */
  private setCached(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export a default instance
export const discourseAPI = new DiscourseAPI();
