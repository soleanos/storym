import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Story } from './story';
import { Slice } from './Slice';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stories: Story[] = [
        { id: 11, title: 'Mr. Nice' },
        { id: 12, title: 'Narcopppp' },
        { id: 13, title: 'Bombasto' },
        { id: 14, title: 'Celeritas' },
        { id: 15, title: 'Magneta' },
        { id: 16, title: 'RubberMan' },
        { id: 17, title: 'Dynama' },
        { id: 18, title: 'Dr IQ' },
        { id: 19, title: 'Magma' },
        { id: 20, title: 'Tornado' }
      ];
      const slices: Slice[] = [
        { title: 'etoile', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 13 },
        { title: 'terre', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 13 },
        { title: 'lune', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 13 },
        { title: 'soleil', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 14 },
      ];
    return {stories, slices};
  }
}

