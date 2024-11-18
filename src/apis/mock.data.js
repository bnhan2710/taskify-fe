
export const mockData = {
  board: {
    id: 'board-id-01',
    title: 'Bao Nhan Board',
    description: 'Taskify Board Description',
    type: 'public', // 'private'
    ownerIds: [],
    memberIds: [],
    listOrderIds: ['list-id-03', 'list-id-01', 'list-id-02', 'list-id-04'],
    lists: [
      {
        id: 'list-id-01',
        boardId: 'board-id-01',
        title: 'To Do list 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            id: 'card-id-01',
            boardId: 'board-id-01',
            listId: 'list-id-01',
            title: 'Title of card 01',
            description: 'Description of card 01',
            cover: 'https://avatars.githubusercontent.com/u/130585782?v=4',
            memberIds: ['test-user-id-01'],
            checklist:['test checklist 01', 'test checklist 02'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          { id: 'card-id-02', boardId: 'board-id-01', listId: 'list-id-01', title: 'Title of card 02', description: null, cover: null, checklist:[], comments: [], attachments: [] },
          { id: 'card-id-03', boardId: 'board-id-01', listId: 'list-id-01', title: 'Title of card 03', description: null, cover: null, checklist:[], comments: [], attachments: [] },
        ]
      },
      {
        id: 'list-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress list 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          { id: 'card-id-08', boardId: 'board-id-01', listId: 'list-id-02', title: 'Title of card 08', description: null, cover: null, checklist:[], comments: [], attachments: [] },
          { id: 'card-id-09', boardId: 'board-id-01', listId: 'list-id-02', title: 'Title of card 09', description: null, cover: null, checklist:[], comments: [], attachments: [] },
          { id: 'card-id-10', boardId: 'board-id-01', listId: 'list-id-02', title: 'Title of card 10', description: null, cover: null, checklist:[], comments: [], attachments: [] }
        ]
      },
      {
        id: 'list-id-03',
        boardId: 'board-id-01',
        title: 'Done list 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          { id: 'card-id-11', boardId: 'board-id-01', listId: 'list-id-03', title: 'Title of card 11', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { id: 'card-id-12', boardId: 'board-id-01', listId: 'list-id-03', title: 'Title of card 12', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { id: 'card-id-13', boardId: 'board-id-01', listId: 'list-id-03', title: 'Title of card 13', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        id: 'list-id-04',
        boardId: 'board-id-01',
        title: 'Empty list 04',
        cardOrderIds: ['list-id-04-placeholder-card'],
        //Special card when list is empty only exist in this list with fe placeholder
        cards: [
          { id: 'list-id-04-placeholder-card', boardId: 'board-id-01', listId: 'list-id-04',
            FE_Placeholder: true
          }
        ]
      }
    ]
  }
}