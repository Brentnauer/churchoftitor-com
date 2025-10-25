/**
 * Text formatting utilities for IBM 5100 terminal display
 * Ensures all content fits within 64-character width constraints
 */

/**
 * Wrap text to specified width with proper word breaking
 */
export function wrapText(text: string, maxWidth: number = 64): string[] {
  if (!text || text.length === 0) return [];
  
  const lines: string[] = [];
  const words = text.split(/\s+/);
  let currentLine = '';
  
  for (const word of words) {
    // If word itself is longer than maxWidth, break it
    if (word.length > maxWidth) {
      if (currentLine.length > 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      
      // Break long word into chunks
      let remaining = word;
      while (remaining.length > maxWidth) {
        lines.push(remaining.substring(0, maxWidth));
        remaining = remaining.substring(maxWidth);
      }
      if (remaining.length > 0) {
        currentLine = remaining;
      }
    } else {
      // Check if adding this word would exceed maxWidth
      const testLine = currentLine + (currentLine.length > 0 ? ' ' : '') + word;
      if (testLine.length > maxWidth) {
        if (currentLine.length > 0) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          lines.push(word);
        }
      } else {
        currentLine = testLine;
      }
    }
  }
  
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }
  
  return lines;
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 64): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Strip HTML tags and decode HTML entities
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Get text content and clean up
  let text = temp.textContent || temp.innerText || '';
  
  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Format a title with proper truncation and padding
 */
export function formatTitle(title: string, maxLength: number = 64): string {
  const cleanTitle = stripHtml(title);
  return truncateText(cleanTitle, maxLength);
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });
  } catch {
    return '??/??/??';
  }
}

/**
 * Format a topic line for display
 */
export function formatTopicLine(topic: Record<string, unknown>, index: number, maxWidth: number = 64): string {
  const number = (index + 1).toString().padStart(2);
  const date = formatDate(topic.created_at as string);
  const title = formatTitle(topic.title as string, 30);
  const posts = (topic.posts_count as number).toString();
  
  const line = `${number}. [${date}] ${title} (${posts} posts)`;
  return truncateText(line, maxWidth);
}

/**
 * Format a post line for display
 */
export function formatPostLine(post: Record<string, unknown>, index: number, maxWidth: number = 64): string {
  const number = (index + 1).toString().padStart(2);
  const username = post.username || 'Unknown';
  const date = formatDate(post.created_at);
  
  const line = `${number}. ${username} - ${date}`;
  return truncateText(line, maxWidth);
}

/**
 * Format content for display with proper line breaks
 */
export function formatContent(content: string, maxWidth: number = 64): string[] {
  const cleanContent = stripHtml(content);
  return wrapText(cleanContent, maxWidth);
}

/**
 * Create a status line with proper formatting
 */
export function formatStatusLine(left: string, right: string, maxWidth: number = 64): string {
  const totalLength = left.length + right.length + 3; // +3 for spaces and separators
  if (totalLength <= maxWidth) {
    return `${left} | ${right}`;
  }
  
  // Truncate right side if needed
  const availableSpace = maxWidth - left.length - 3;
  const truncatedRight = truncateText(right, availableSpace);
  return `${left} | ${truncatedRight}`;
}

/**
 * Create a centered title line
 */
export function formatCenteredTitle(title: string, maxWidth: number = 64): string {
  const cleanTitle = title.trim();
  if (cleanTitle.length >= maxWidth) {
    return truncateText(cleanTitle, maxWidth);
  }
  
  const padding = Math.floor((maxWidth - cleanTitle.length) / 2);
  return ' '.repeat(padding) + cleanTitle;
}

/**
 * Create a separator line
 */
export function formatSeparator(char: string = '='): string {
  return char.repeat(64);
}

/**
 * Format a single line to exactly 64 characters
 * Pads with spaces or truncates with ellipsis
 */
export function formatLine(text: string): string {
  if (text.length === 64) return text;
  if (text.length < 64) return text.padEnd(64);
  return text.substring(0, 61) + '...';
}

/**
 * Format an array of lines to exactly 64 characters each
 */
export function formatLines(lines: string[]): string[] {
  return lines.map(line => formatLine(line));
}
