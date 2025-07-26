import Conf from 'conf';

export class IdeaManager {
  constructor() {
    this.config = new Conf({
      projectName: 'vindex',
      schema: {
        ideas: {
          type: 'array',
          default: []
        }
      }
    });
  }

  async addIdea(idea) {
    const ideas = this.config.get('ideas', []);
    ideas.push({
      id: Date.now().toString(),
      title: idea.title,
      impact: idea.impact,
      time: idea.time,
      roi: idea.roi,
      createdAt: new Date().toISOString(),
      score: this.calculateScore(idea)
    });
    
    this.config.set('ideas', ideas);
  }

  async getAllIdeas() {
    return this.config.get('ideas', []);
  }

  async prioritizeIdeas() {
    const ideas = await this.getAllIdeas();
    if (ideas.length === 0) return [];

    // Build max heap
    const heap = this.buildMaxHeap(ideas);
    
    // Extract ideas in priority order
    const prioritized = [];
    const heapCopy = [...heap];
    
    while (heapCopy.length > 0) {
      prioritized.push(this.extractMax(heapCopy));
    }

    return prioritized;
  }

  buildMaxHeap(ideas) {
    const heap = [...ideas];
    
    // Start from the last non-leaf node
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
      this.heapify(heap, i);
    }
    
    return heap;
  }

  heapify(heap, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heap.length && heap[left].score > heap[largest].score) {
      largest = left;
    }

    if (right < heap.length && heap[right].score > heap[largest].score) {
      largest = right;
    }

    if (largest !== index) {
      [heap[index], heap[largest]] = [heap[largest], heap[index]];
      this.heapify(heap, largest);
    }
  }

  extractMax(heap) {
    if (heap.length === 0) return null;
    
    const max = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    
    if (heap.length > 0) {
      this.heapify(heap, 0);
    }
    
    return max;
  }

  calculateScore(idea) {
    // Weighted scoring algorithm
    const impactWeight = 0.4;
    const roiWeight = 0.4;
    const timeWeight = 0.2;
    
    // Time is inverted (shorter time = higher score)
    const timeScore = Math.max(1, 10 - idea.time);
    
    const score = (
      idea.impact * impactWeight +
      idea.roi * roiWeight +
      timeScore * timeWeight
    ) * 10;
    
    return Math.round(score);
  }

  async clearAllIdeas() {
    this.config.set('ideas', []);
  }

  async getIdeaById(id) {
    const ideas = await this.getAllIdeas();
    return ideas.find(idea => idea.id === id);
  }

  async updateIdea(id, updates) {
    const ideas = await this.getAllIdeas();
    const index = ideas.findIndex(idea => idea.id === id);
    
    if (index !== -1) {
      ideas[index] = { ...ideas[index], ...updates };
      if (updates.impact || updates.time || updates.roi) {
        ideas[index].score = this.calculateScore(ideas[index]);
      }
      this.config.set('ideas', ideas);
      return true;
    }
    
    return false;
  }

  async deleteIdea(id) {
    const ideas = await this.getAllIdeas();
    const filtered = ideas.filter(idea => idea.id !== id);
    this.config.set('ideas', filtered);
  }
} 