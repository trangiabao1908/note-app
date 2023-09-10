export default {
   authors: [
      {
         id: '1',
         name: 'John',
      },
   ],
   folders: [
      {
         id: '1',
         name: 'Play game',
         createdAt: '2023',
         authorId: '1',
      },
      {
         id: '2',
         name: 'Do HomeWork',
         createdAt: '2023',
         authorId: '1',
      },
   ],
   notes: [
      {
         id: '1',
         folderId: '1',
         content: '<p>Day la ghi chu 1</p>',
      },
      {
         id: '2',
         folderId: '1',
         content: '<p>Day la ghi chu 2</p>',
      },
      {
         id: '3',
         folderId: '2',
         content: '<p>Day la ghi chu 3</p>',
      },
   ],
};
