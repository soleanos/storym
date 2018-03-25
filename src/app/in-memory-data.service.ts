import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Story } from './story';
import { Slice } from './Slice';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stories: Story[] = [
        { id: 1, title: 'Harry Potter' }
      ];
      const slices: Slice[] = [
        { level : 0, id : 10, title: 'Chapitre I', text: "Une nouvelle année commence pour vous à Poudlard ! Qu'allez vous faire ? ", story: 1, choices : [{title:"Le rêve",text:"Aller dormir"},{title:"La visite",text:"Visiter poudlard"},]}
      ];
    return {stories, slices};
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    if (collectionName === 'nobodies') {
      console.log('genId override for \'nobodies\'');
      return this.guid();
    } else if (collection) {
      console.log(`genId override for '${collectionName}'`);
      return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
    }

}
}

