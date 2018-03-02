import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Story } from './story';
import { Slice } from './Slice';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stories: Story[] = [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narcopppp' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
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

