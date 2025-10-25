"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { formatContent, formatDate, formatLine, formatLines } from '../utils/textFormatting';

interface SimpleIBM5100Props {
  onStatusChange?: (status: unknown) => void;
  onDisplayUpdate?: (canvas: HTMLCanvasElement) => void;
}

export default function SimpleIBM5100({ }: SimpleIBM5100Props) {
  const [display, setDisplay] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentView, setCurrentView] = useState('boot');
  const [bootStep, setBootStep] = useState(0);
  const [inputMode, setInputMode] = useState<'menu' | 'text'>('menu');
  const [forumData, setForumData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [maxDisplayLines] = useState(14); // Maximum lines to show at once
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['menu']);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const [, setRetryCount] = useState<number>(0);
  // const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence steps
  const bootSteps = [
    'IBM 5100 PORTABLE COMPUTER SYSTEM',
    'INITIALIZING PALM PROCESSOR...',
    'LOADING SYSTEM ROM...',
    'INITIALIZING MEMORY...',
    'STARTING BASIC INTERPRETER...',
    'READY'
  ];

  useEffect(() => {
    if (currentView === 'boot') {
      const bootInterval = setInterval(() => {
        setBootStep(prev => {
          if (prev < bootSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(bootInterval);
            // Show menu after boot
            setTimeout(() => {
              setCurrentView('menu');
              setDisplay(formatLines([
                'IBM 5100 TEMPORAL BBS SYSTEM',
                '============================',
                '',
                '[1] VIEW FORUM TOPICS',
                '[2] READ POSTS',
                '[3] SEARCH TOPICS',
                '[4] CATEGORIES',
                '[5] ABOUT/HELP',
                '[6] SYSTEM STATUS',
                '',
                'SELECT OPTION [1-6]:',
                '>'
              ]));
            }, 1000);
            return prev;
          }
        });
      }, 800);

      return () => clearInterval(bootInterval);
    }
  }, [currentView, bootSteps.length]);

  const addLine = (text: string) => {
    setDisplay(prev => [...prev, text]);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLastError(null);
    // Retry the last operation based on current view
    switch (currentView) {
      case 'topics':
        fetchTopics();
        break;
      case 'categories':
        fetchCategories();
        break;
      case 'search':
        // Would need to store last search query
        break;
      default:
        setCurrentView('menu');
        setDisplay(formatLines([
          'IBM 5100 TEMPORAL BBS SYSTEM',
          '============================',
          '',
          '[1] VIEW FORUM TOPICS',
          '[2] READ POSTS',
          '[3] SEARCH TOPICS',
          '[4] CATEGORIES',
          '[5] ABOUT/HELP',
          '[6] SYSTEM STATUS',
          '',
          'SELECT OPTION [1-6]:',
          '>'
        ]));
    }
  };

  const clearDisplay = () => {
    setDisplay([]);
    setScrollOffset(0);
  };

  const scrollUp = () => {
    if (scrollOffset > 0) {
      setScrollOffset(prev => Math.max(0, prev - 1));
    }
  };

  const scrollDown = () => {
    if (display.length > maxDisplayLines && scrollOffset < display.length - maxDisplayLines) {
      setScrollOffset(prev => Math.min(display.length - maxDisplayLines, prev + 1));
    }
  };

  const getVisibleLines = () => {
    if (display.length <= maxDisplayLines) {
      return display;
    }
    return display.slice(scrollOffset, scrollOffset + maxDisplayLines);
  };

  const hasMoreContent = () => {
    return display.length > maxDisplayLines && scrollOffset < display.length - maxDisplayLines;
  };

  const getScrollInfo = () => {
    const totalLines = display.length;
    const visibleLines = maxDisplayLines;
    const currentPage = Math.floor(scrollOffset / visibleLines) + 1;
    const totalPages = Math.ceil(totalLines / visibleLines);
    return { currentPage, totalPages, totalLines };
  };

  const handleBackNavigation = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current view
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      
      // Restore previous view with its data
      switch (previousView) {
        case 'topic':
          // Restore topic view
        if (forumData?.currentTopic && (forumData.currentTopic as Record<string, unknown>).topic && (forumData.currentTopic as Record<string, unknown>).posts) {
          setCurrentView('topic');
          setDisplay([
            `TOPIC: ${((forumData.currentTopic as Record<string, unknown>).topic as Record<string, unknown>).title}`,
            `AUTHOR: ${(((forumData.currentTopic as Record<string, unknown>).posts as Record<string, unknown>[])[0]?.username || 'Unknown')}`,
              `DATE: ${new Date(((forumData.currentTopic as Record<string, unknown>).topic as Record<string, unknown>).created_at as string).toLocaleDateString()}`,
              '=====================================',
              '',
              ...((forumData.currentTopic as Record<string, unknown>).posts as Record<string, unknown>[]).slice(0, 5).map((post: Record<string, unknown>, index: number) => 
                `${(index + 1).toString().padStart(2)}. ${post.username} - ${new Date(post.created_at as string).toLocaleDateString()}`
              ),
              '',
              'ENTER POST NUMBER TO READ:',
              '>'
            ]);
          }
          break;
        case 'topics':
          // Restore topics list
          if (forumData?.topics) {
            setCurrentView('topics');
            setDisplay([
              'TIME TRAVEL INSTITUTE - LATEST TOPICS',
              '=====================================',
              '',
              ...(forumData.topics as Record<string, unknown>[]).slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
                const number = (index + 1).toString().padStart(2);
                const date = new Date(topic.created_at as string).toLocaleDateString();
                const title = (topic.title as string).substring(0, 25);
                const posts = topic.posts_count as number;
                const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
                return line.length > 64 ? line.substring(0, 61) + '...' : line;
              }),
              '',
              'ENTER TOPIC NUMBER TO VIEW:',
              '>'
            ]);
          }
          break;
        case 'category-topics':
          // Restore category topics list
          if (forumData?.categoryTopics) {
            setCurrentView('category-topics');
            setDisplay([
              'CATEGORY TOPICS',
              '===============',
              '',
              ...(forumData.categoryTopics as Record<string, unknown>[]).slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
                const number = (index + 1).toString().padStart(2);
                const date = new Date(topic.created_at as string).toLocaleDateString();
                const title = (topic.title as string).substring(0, 25);
                const posts = topic.posts_count as number;
                const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
                return line.length > 64 ? line.substring(0, 61) + '...' : line;
              }),
              '',
              'ENTER TOPIC NUMBER TO VIEW:',
              '>'
            ]);
          }
          break;
        case 'search-results':
          // Restore search results
          if (forumData?.searchResults && (forumData.searchResults as Record<string, unknown>).topics) {
            setCurrentView('search-results');
            setDisplay([
              'SEARCH RESULTS',
              '==============',
              '',
              ...((forumData.searchResults as Record<string, unknown>).topics as Record<string, unknown>[]).slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
                const number = (index + 1).toString().padStart(2);
                const date = new Date(topic.created_at as string).toLocaleDateString();
                const title = (topic.title as string).substring(0, 25);
                const posts = topic.posts_count as number;
                const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
                return line.length > 64 ? line.substring(0, 61) + '...' : line;
              }),
              '',
              'ENTER TOPIC NUMBER TO VIEW:',
              '>'
            ]);
          }
          break;
        case 'search':
          // Return to search input
          setCurrentView('search');
          setDisplay([
            'SEARCH FORUM',
            '============',
            'ENTER SEARCH QUERY:',
            '>'
          ]);
          break;
        case 'categories':
          // Return to categories list
          if (forumData?.categories) {
            setCurrentView('categories');
            setDisplay([
              'FORUM CATEGORIES',
              '================',
              '',
              ...(forumData.categories as Record<string, unknown>[]).slice(0, 10).map((category: Record<string, unknown>, index: number) => 
                `${(index + 1).toString().padStart(2)}. ${category.name} (${category.topic_count} topics)`
              ),
              '',
              'ENTER CATEGORY NUMBER TO VIEW TOPICS:',
              '>'
            ]);
          }
          break;
        default:
          // Return to menu
          setCurrentView('menu');
          setInputMode('menu');
          setDisplay([
            'IBM 5100 TEMPORAL BBS SYSTEM',
            '============================',
            '',
            '[1] VIEW FORUM TOPICS',
            '[2] READ POSTS',
            '[3] SEARCH TOPICS',
            '[4] CATEGORIES',
            '[5] ABOUT/HELP',
            '[6] SYSTEM STATUS',
            '',
            'SELECT OPTION [1-6]:',
            '>'
          ]);
      }
      setScrollOffset(0);
    }
  };

  // API integration functions
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/forum?action=topics&limit=20');
      const data = await response.json();
      if (data.success) {
        setForumData({ topics: data.data });
        setDisplay([
          'TIME TRAVEL INSTITUTE - LATEST TOPICS',
          '=====================================',
          '',
          ...data.data.slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
            const number = (index + 1).toString().padStart(2);
            const date = new Date(topic.created_at as string).toLocaleDateString();
            const title = (topic.title as string).substring(0, 25);
            const posts = topic.posts_count as number;
            const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
            return line.length > 64 ? line.substring(0, 61) + '...' : line;
          }),
          '',
          'ENTER TOPIC NUMBER TO VIEW:',
          '>'
        ]);
        setInputMode('text');
        setCurrentView('topics');
        setNavigationHistory(prev => [...prev, 'topics']);
      } else {
        const errorMsg = data.error || 'Unknown error';
        setLastError(errorMsg);
        addLine(`ERROR: Failed to load topics (${errorMsg})`);
        addLine('PRESS R TO RETRY OR /h TO RETURN HOME');
        addLine('>');
      }
    } catch (error: unknown) {
      const errorMsg = (error as Error).message || 'Unknown error';
      setLastError(errorMsg);
      addLine(`ERROR: Network connection failed (${errorMsg})`);
      addLine('PRESS R TO RETRY OR /h TO RETURN HOME');
      addLine('>');
    }
    setLoading(false);
  };

  const fetchTopic = async (topicId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/forum/topic/${topicId}`);
      const data = await response.json();
      if (data.success) {
        setForumData({ currentTopic: data.data });
        setDisplay([
          `TOPIC: ${(data.data.topic as Record<string, unknown>).title}`,
          `AUTHOR: ${(data.data.posts as Record<string, unknown>[])[0]?.username || 'Unknown'}`,
          `DATE: ${new Date((data.data.topic as Record<string, unknown>).created_at as string).toLocaleDateString()}`,
          '=====================================',
          '',
          ...(data.data.posts as Record<string, unknown>[]).slice(0, 5).map((post: Record<string, unknown>, index: number) => 
            `${(index + 1).toString().padStart(2)}. ${post.username} - ${new Date(post.created_at as string).toLocaleDateString()}`
          ),
          '',
          'ENTER POST NUMBER TO READ:',
          '>'
        ]);
        setInputMode('text');
        setCurrentView('topic');
        setNavigationHistory(prev => [...prev, 'topic']);
      } else {
        addLine(`ERROR: Topic not found (${data.error || 'Unknown error'})`);
        addLine('RETRY? (Y/N)');
        addLine('>');
      }
    } catch (error: unknown) {
      addLine(`ERROR: Network connection failed (${(error as Error).message || 'Unknown error'})`);
      addLine('RETRY? (Y/N)');
      addLine('>');
    }
    setLoading(false);
  };

  const searchForum = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/forum?action=search&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setForumData({ searchResults: data.data });
        setDisplay([
          `SEARCH RESULTS FOR: "${query}"`,
          '============================',
          '',
          ...(data.data.topics as Record<string, unknown>[]).slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
            const number = (index + 1).toString().padStart(2);
            const date = new Date(topic.created_at as string).toLocaleDateString();
            const title = (topic.title as string).substring(0, 25);
            const posts = topic.posts_count as number;
            const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
            return line.length > 64 ? line.substring(0, 61) + '...' : line;
          }),
          '',
          'ENTER TOPIC NUMBER TO VIEW:',
          '>'
        ]);
        setInputMode('text');
        setCurrentView('search-results');
        setNavigationHistory(prev => [...prev, 'search-results']);
      } else {
        addLine(`ERROR: Search failed (${data.error || 'Unknown error'})`);
        addLine('RETRY? (Y/N)');
        addLine('>');
      }
    } catch (error: unknown) {
      addLine(`ERROR: Network connection failed (${(error as Error).message || 'Unknown error'})`);
      addLine('RETRY? (Y/N)');
      addLine('>');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/forum?action=categories');
      const data = await response.json();
      if (data.success) {
        setForumData({ categories: data.data });
        setDisplay([
          'FORUM CATEGORIES',
          '================',
          '',
          ...(data.data as Record<string, unknown>[]).slice(0, 10).map((category: Record<string, unknown>, index: number) => 
            `${(index + 1).toString().padStart(2)}. ${category.name} (${category.topic_count} topics)`
          ),
          '',
          'ENTER CATEGORY NUMBER TO VIEW TOPICS:',
          '>'
        ]);
        setInputMode('text');
        setCurrentView('categories');
        setNavigationHistory(prev => [...prev, 'categories']);
      } else {
        addLine(`ERROR: Failed to load categories (${data.error || 'Unknown error'})`);
        addLine('RETRY? (Y/N)');
        addLine('>');
      }
    } catch (error: unknown) {
      addLine(`ERROR: Network connection failed (${(error as Error).message || 'Unknown error'})`);
      addLine('RETRY? (Y/N)');
      addLine('>');
    }
    setLoading(false);
  };

  const fetchCategoryTopics = async (categorySlug: string, categoryName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/forum?action=category&category=${encodeURIComponent(categorySlug)}&limit=20`);
      const data = await response.json();
      if (data.success) {
        setForumData({ categoryTopics: data.data });
        setDisplay([
          `CATEGORY: ${categoryName.toUpperCase()}`,
          '============================',
          '',
          ...data.data.slice(0, 10).map((topic: Record<string, unknown>, index: number) => {
            const number = (index + 1).toString().padStart(2);
            const date = new Date(topic.created_at as string).toLocaleDateString();
            const title = (topic.title as string).substring(0, 25);
            const posts = topic.posts_count as number;
            const line = `${number}. [${date}] ${title}${(topic.title as string).length > 25 ? '...' : ''} (${posts} posts)`;
            return line.length > 64 ? line.substring(0, 61) + '...' : line;
          }),
          '',
          'ENTER TOPIC NUMBER TO VIEW:',
          '>'
        ]);
        setInputMode('text');
        setCurrentView('category-topics');
        setNavigationHistory(prev => [...prev, 'category-topics']);
      } else {
        addLine(`ERROR: Failed to load category topics (${data.error || 'Unknown error'})`);
        addLine('RETRY? (Y/N)');
        addLine('>');
      }
    } catch (error: unknown) {
      addLine(`ERROR: Network connection failed (${(error as Error).message || 'Unknown error'})`);
      addLine('RETRY? (Y/N)');
      addLine('>');
    }
    setLoading(false);
  };

  const displayPostContent = (postNumber: number) => {
    if (!forumData?.currentTopic || !(forumData.currentTopic as Record<string, unknown>).posts) {
      addLine('ERROR: No topic loaded');
      addLine('>');
      return;
    }

    const post = (forumData.currentTopic as Record<string, unknown>).posts as Record<string, unknown>[];
    const selectedPost = post[postNumber - 1];
    if (!selectedPost) {
      addLine('ERROR: Invalid post number');
      addLine('>');
      return;
    }

    // Format post content
    const username = selectedPost.username as string || 'Unknown';
    const date = formatDate(selectedPost.created_at as string);
    const content = formatContent(selectedPost.cooked as string || 'No content available');
    
    // Create display lines with navigation
    const totalPosts = post.length;
    const titleLine = `POST #${postNumber} OF ${totalPosts} - ${username}`;
    const displayLines = [
      formatLine(titleLine),
      formatLine(`DATE: ${date}`),
      formatLine('='.repeat(64)),
      formatLine(''),
      ...content.slice(0, 8).map(line => formatLine(line)), // Show first 8 lines of content to leave room for navigation
      formatLine(''),
      postNumber > 1 ? formatLine('[P]revious') : '',
      postNumber < totalPosts ? formatLine('[N]ext') : '',
      formatLine('[ESC] Back to Topic')
    ].filter(line => line !== ''); // Remove empty lines

    setDisplay(displayLines);
    setInputMode('text');
    setCurrentView('post-content');
    setNavigationHistory(prev => [...prev, 'post-content']);
    setCurrentPostIndex(postNumber - 1);
  };

  const handleMenuSelection = (choice: number) => {
    clearDisplay();
    
    switch (choice) {
      case 1:
        setCurrentView('topics');
        setNavigationHistory(prev => [...prev, 'topics']);
        addLine('LOADING FORUM TOPICS...');
        fetchTopics();
        break;
      case 2:
        setCurrentView('posts');
        setNavigationHistory(prev => [...prev, 'posts']);
        setDisplay([
          'POST READER',
          '===========',
          'ENTER TOPIC ID TO READ:',
          '>'
        ]);
        setInputMode('text');
        break;
      case 3:
        setCurrentView('search');
        setNavigationHistory(prev => [...prev, 'search']);
        setDisplay([
          'SEARCH FORUM',
          '============',
          'ENTER SEARCH QUERY:',
          '>'
        ]);
        setInputMode('text');
        break;
      case 4:
        setCurrentView('categories');
        setNavigationHistory(prev => [...prev, 'categories']);
        addLine('LOADING CATEGORIES...');
        fetchCategories();
        break;
      case 5:
        setCurrentView('help');
        setNavigationHistory(prev => [...prev, 'help']);
        setDisplay([
          'CHURCH OF TITOR TEMPORAL SYSTEM',
          '==============================',
          'This IBM 5100 emulator provides access to',
          'the Time Travel Institute forum through',
          'authentic BASIC programming.',
          '',
          'COMMANDS:',
          'FETCH TOPICS    - Load latest topics',
          'FETCH TOPIC <id> - Load specific topic',
          'SEARCH <query>  - Search forum',
          'SHOW TOPIC <n>  - Display topic',
          'SHOW POST <n>   - Display post',
          'LIST TOPICS     - List loaded topics',
          'LIST POSTS      - List loaded posts',
          'LIST CATEGORIES - List forum categories',
          '',
          'PRESS ANY KEY TO CONTINUE...'
        ]);
        setInputMode('text');
        break;
      case 6:
        setCurrentView('status');
        setNavigationHistory(prev => [...prev, 'status']);
        setDisplay([
          'IBM 5100 SYSTEM STATUS',
          '======================',
          'Model: IBM 5100 Portable Computer',
          'CPU: PALM Processor (1 MHz)',
          'Memory: 64KB RAM, 32KB ROM',
          'Display: 5" CRT (64×16 characters)',
          'Tape: DC-300 Cartridge Drive',
          'Languages: BASIC, APL',
          'Status: RUNNING',
          'Forum: timetravelinstitute.com',
          'Connection: ONLINE',
          '',
          'PRESS ANY KEY TO CONTINUE...'
        ]);
        setInputMode('text');
        break;
      default:
        addLine('INVALID CHOICE. TRY AGAIN.');
        addLine('>');
        break;
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isInitialized || loading) return;

    // Handle Ctrl+key combinations
    if (event.ctrlKey) {
      event.preventDefault();
      switch (event.key) {
        case 'c':
          clearDisplay();
          addLine('DISPLAY CLEARED');
          addLine('>');
          break;
        case 'h':
          addLine('HELP: Use number keys for menu selection');
          break;
        case 'b':
          addLine('RETURNING TO MAIN MENU...');
          setTimeout(() => {
            setCurrentView('menu');
            setInputMode('menu');
            setDisplay([
              'IBM 5100 TEMPORAL BBS SYSTEM',
              '============================',
              '',
              '[1] VIEW FORUM TOPICS',
              '[2] READ POSTS',
              '[3] SEARCH TOPICS',
              '[4] CATEGORIES',
              '[5] ABOUT/HELP',
              '[6] SYSTEM STATUS',
              '',
              'SELECT OPTION [1-6]:',
              '>'
            ]);
          }, 1000);
          break;
      }
      return;
    }

    // Handle input based on current mode
    if (inputMode === 'menu') {
      // In menu mode, number keys select options
      if (event.key >= '1' && event.key <= '9') {
        event.preventDefault();
        const choice = parseInt(event.key);
        handleMenuSelection(choice);
        return;
      }
    } else if (inputMode === 'text') {
      // In text mode, handle typing and commands
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (currentLine.trim()) {
            addLine(`> ${currentLine}`);
            handleTextInput(currentLine.trim());
            setCurrentLine('');
          }
          break;
        case 'Backspace':
          event.preventDefault();
          if (currentLine.length > 0) {
            setCurrentLine(prev => prev.slice(0, -1));
          }
          break;
        case 'Escape':
          event.preventDefault();
          handleBackNavigation();
          break;
        case 'r':
        case 'R':
          if (lastError) {
            event.preventDefault();
            handleRetry();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          scrollUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          scrollDown();
          break;
        case ' ':
          event.preventDefault();
          if (hasMoreContent()) {
            scrollDown();
          } else {
            setCurrentLine(prev => prev + ' ');
          }
          break;
        default:
          if (event.key.length === 1 && !event.ctrlKey) {
            setCurrentLine(prev => prev + event.key);
          }
          break;
      }
    }
  }, [isInitialized, loading, inputMode, currentLine, handleBackNavigation, handleMenuSelection, hasMoreContent, scrollDown, scrollUp, handleRetry, lastError]);

  const handleTextInput = useCallback((input: string) => {
    // Handle quick commands first
    if (input.startsWith('/')) {
      const command = input.toLowerCase();
      switch (command) {
        case '/h':
        case '/home':
          setCurrentView('menu');
          setNavigationHistory(['menu']);
          setDisplay(formatLines([
            'IBM 5100 TEMPORAL BBS SYSTEM',
            '============================',
            '',
            '[1] VIEW FORUM TOPICS',
            '[2] READ POSTS',
            '[3] SEARCH TOPICS',
            '[4] CATEGORIES',
            '[5] ABOUT/HELP',
            '[6] SYSTEM STATUS',
            '',
            'SELECT OPTION [1-6]:',
            '>'
          ]));
          setInputMode('menu');
          break;
        case '/b':
        case '/back':
          handleBackNavigation();
          break;
        case '/r':
        case '/refresh':
          if (currentView === 'topics') {
            fetchTopics();
          } else if (currentView === 'categories') {
            fetchCategories();
          } else {
            addLine('REFRESH: No data to refresh');
            addLine('>');
          }
          break;
        case '/help':
          addLine('QUICK COMMANDS:');
          addLine('/h or /home - Return to menu');
          addLine('/b or /back - Go back');
          addLine('/r or /refresh - Refresh current view');
          addLine('/s <query> - Quick search');
          addLine('>');
          break;
        default:
          if (command.startsWith('/s ')) {
            const query = input.substring(3);
            if (query.trim()) {
              searchForum(query.trim());
            } else {
              addLine('ERROR: Search query required');
              addLine('>');
            }
          } else {
            addLine(`ERROR: Unknown command "${input}"`);
            addLine('Type /help for available commands');
            addLine('>');
          }
      }
      return;
    }

    // Handle different text input scenarios based on current view
    if (currentView === 'menu') {
      // Handle menu commands
      if (input.toLowerCase() === 'help') {
        addLine('HELP: Use number keys 1-6 for menu selection');
        addLine('>');
      } else if (input.toLowerCase() === 'clear') {
        clearDisplay();
        addLine('DISPLAY CLEARED');
        addLine('>');
      } else {
        addLine('UNKNOWN COMMAND. TRY HELP OR USE NUMBER KEYS.');
        addLine('>');
      }
    } else if (currentView === 'posts') {
      // Handle topic ID input for post reader
      if (!isNaN(parseInt(input))) {
        const topicId = parseInt(input);
        fetchTopic(topicId);
      } else {
        addLine('ERROR: Please enter a valid topic ID number');
        addLine('>');
      }
    } else if (currentView === 'search') {
      // Handle search query input
      if (input.toLowerCase().startsWith('search ')) {
        const query = input.substring(7).trim();
        if (query) {
          searchForum(query);
        } else {
          addLine('ERROR: Please provide search query');
          addLine('>');
        }
      } else if (input.trim()) {
        // Direct search query without "search " prefix
        searchForum(input.trim());
      } else {
        addLine('ERROR: Please provide search query');
        addLine('>');
      }
    } else if (currentView === 'topics' || currentView === 'categories') {
      // Handle numeric selection for topics or categories
      if (!isNaN(parseInt(input))) {
        const num = parseInt(input);
        
        if (currentView === 'topics') {
          // Handle topic selection
          if (forumData?.topics && num > 0 && num <= (forumData.topics as unknown[]).length) {
            const topic = (forumData.topics as Record<string, unknown>[])[num - 1];
            fetchTopic(topic.id as number);
          } else {
            addLine('ERROR: Invalid topic selection number');
            addLine('>');
          }
        } else if (currentView === 'categories') {
          // Handle category selection - fetch topics from that category
          if (forumData?.categories && num > 0 && num <= ((forumData.categories as Record<string, unknown>[]).length)) {
            const category = (forumData.categories as Record<string, unknown>[])[num - 1];
            fetchCategoryTopics(category.slug as string, category.name as string);
          } else {
            addLine('ERROR: Invalid category selection number');
            addLine('>');
          }
        }
      } else {
        addLine('ERROR: Please enter a valid number for selection');
        addLine('>');
      }
    } else if (currentView === 'topic') {
      // Handle post selection when viewing a topic
      if (!isNaN(parseInt(input))) {
        const num = parseInt(input);
        if (forumData?.currentTopic && (forumData.currentTopic as Record<string, unknown>).posts && num > 0 && num <= ((forumData.currentTopic as Record<string, unknown>).posts as unknown[]).length) {
          displayPostContent(num);
        } else {
          addLine('ERROR: Invalid post selection number');
          addLine('>');
        }
      } else {
        addLine('ERROR: Please enter a valid post number');
        addLine('>');
      }
    } else if (currentView === 'search-results') {
      // Handle topic selection from search results
      if (!isNaN(parseInt(input))) {
        const num = parseInt(input);
        if (forumData?.searchResults && (forumData.searchResults as Record<string, unknown>).topics && num > 0 && num <= ((forumData.searchResults as Record<string, unknown>).topics as unknown[]).length) {
          const topic = ((forumData.searchResults as Record<string, unknown>).topics as Record<string, unknown>[])[num - 1];
          fetchTopic(topic.id as number);
        } else {
          addLine('ERROR: Invalid search result selection number');
          addLine('>');
        }
      } else {
        addLine('ERROR: Please enter a valid number for selection');
        addLine('>');
      }
    } else if (currentView === 'category-topics') {
      // Handle topic selection from category topics
      if (!isNaN(parseInt(input))) {
        const num = parseInt(input);
        if (forumData?.categoryTopics && num > 0 && num <= ((forumData.categoryTopics as Record<string, unknown>[]).length)) {
          const topic = (forumData.categoryTopics as Record<string, unknown>[])[num - 1];
          fetchTopic(topic.id as number);
        } else {
          addLine('ERROR: Invalid category topic selection number');
          addLine('>');
        }
      } else {
        addLine('ERROR: Please enter a valid number for selection');
        addLine('>');
      }
    } else if (currentView === 'post-content') {
      // Handle next/previous post navigation
      const inputLower = input.toLowerCase();
      if (inputLower === 'n') {
        // Next post
        if (forumData?.currentTopic && (forumData.currentTopic as Record<string, unknown>).posts) {
          const posts = (forumData.currentTopic as Record<string, unknown>).posts as Record<string, unknown>[];
          if (currentPostIndex < posts.length - 1) {
            displayPostContent(currentPostIndex + 2); // +2 because displayPostContent expects 1-based index
          } else {
            addLine('ALREADY AT LAST POST');
            addLine('>');
          }
        }
      } else if (inputLower === 'p') {
        // Previous post
        if (forumData?.currentTopic && (forumData.currentTopic as Record<string, unknown>).posts) {
          if (currentPostIndex > 0) {
            displayPostContent(currentPostIndex); // currentPostIndex is 0-based, displayPostContent expects 1-based
          } else {
            addLine('ALREADY AT FIRST POST');
            addLine('>');
          }
        }
      } else if (input.trim()) {
        // Any other key - use smart back navigation
        handleBackNavigation();
      }
    } else if (currentView === 'help' || currentView === 'status') {
      // Handle any key press to continue
      if (input.trim()) {
        addLine('RETURNING TO MAIN MENU...');
        setTimeout(() => {
          setInputMode('menu');
          setCurrentView('menu');
          setDisplay([
            'IBM 5100 TEMPORAL BBS SYSTEM',
            '============================',
            '',
            '[1] VIEW FORUM TOPICS',
            '[2] READ POSTS',
            '[3] SEARCH TOPICS',
            '[4] CATEGORIES',
            '[5] ABOUT/HELP',
            '[6] SYSTEM STATUS',
            '',
            'SELECT OPTION [1-6]:',
            '>'
          ]);
        }, 1000);
      }
    } else {
      // Handle retry logic and other commands
      if (input.toLowerCase() === 'y' || input.toLowerCase() === 'yes') {
        // Retry last operation
        addLine('RETRYING...');
        addLine('RETRY NOT IMPLEMENTED YET');
        addLine('>');
      } else if (input.toLowerCase() === 'n' || input.toLowerCase() === 'no') {
        // Cancel retry, return to menu
        addLine('RETURNING TO MAIN MENU...');
        setTimeout(() => {
          setInputMode('menu');
          setCurrentView('menu');
          setDisplay([
            'IBM 5100 TEMPORAL BBS SYSTEM',
            '============================',
            '',
            '[1] VIEW FORUM TOPICS',
            '[2] READ POSTS',
            '[3] SEARCH TOPICS',
            '[4] CATEGORIES',
            '[5] ABOUT/HELP',
            '[6] SYSTEM STATUS',
            '',
            'SELECT OPTION [1-6]:',
            '>'
          ]);
        }, 1000);
      } else {
        addLine('ERROR: Invalid input. Use numbers for selection or commands.');
        addLine('>');
      }
    }
  }, [currentView, forumData, currentPostIndex, handleBackNavigation, fetchTopics, fetchCategories, searchForum, fetchTopic, fetchCategoryTopics, displayPostContent, addLine, clearDisplay, setCurrentView, setNavigationHistory, setInputMode, setDisplay, formatLines]);

  useEffect(() => {
    setIsInitialized(true);
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="terminal">
      <div className="terminal-screen">
        <div className="terminal-display">
          <div className="status-line">
            {formatLine(`IBM 5100 | ${currentView === 'boot' ? 'INITIALIZING...' : 'RUNNING'} | 4:22:37 PM USER: GUEST`)}
          </div>
          
          <div className="terminal-content">
            {currentView === 'boot' ? (
              <div>
                {bootSteps.slice(0, bootStep + 1).map((step, index) => (
                  <div key={index} className="terminal-line">
                    {formatLine(step)}
                  </div>
                ))}
                {bootStep < bootSteps.length - 1 && (
                  <div className="terminal-line">
                    <span className="cursor">█</span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {getVisibleLines().map((line, index) => (
                  <div key={index} className="terminal-line">
                    {formatLine(line)}
                  </div>
                ))}
                {hasMoreContent() && (() => {
                  const { currentPage, totalPages } = getScrollInfo();
                  return (
                    <div className="terminal-line">
                      {formatLine(`PAGE ${currentPage} OF ${totalPages} - PRESS SPACE OR ARROW KEYS`)}
                    </div>
                  );
                })()}
                {loading && (
                  <div className="terminal-line loading-text">
                    {formatLine('LOADING...')}
                  </div>
                )}
                {!loading && currentLine && (
                  <div className="terminal-line">
                    {formatLine(`> ${currentLine}`)}<span className="cursor">█</span>
                  </div>
                )}
                {!loading && !currentLine && inputMode === 'text' && currentView !== 'menu' && (
                  <div className="terminal-line">
                    {formatLine('>')}<span className="cursor">█</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="command-line">
            {formatLine(currentView === 'menu' && !loading ? 'CHURCH OF TITOR BBS NODE 1' : 
                       currentView === 'boot' ? 'INITIALIZING...' : 
                       loading ? 'LOADING...' : 
                       lastError ? 'ERROR - PRESS R TO RETRY' :
                       'WAITING')}
          </div>
        </div>
      </div>
    </div>
  );
}
