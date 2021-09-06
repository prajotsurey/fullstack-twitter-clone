'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    insert into posts (content, user_id, "createdAt" , likes) values ('Fliptune', 1, '2021-05-30T15:55:59Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Pixoboo', 1, '2021-08-21T06:05:46Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Chatterbridge', 1, '2020-08-28T15:57:21Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Twimbo', 1, '2020-12-18T21:12:05Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Mybuzz', 1, '2021-04-13T00:21:39Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Avavee', 1, '2020-11-06T06:40:12Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Tazzy', 1, '2021-06-10T10:30:21Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Tavu', 1, '2020-12-23T10:32:53Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Skinix', 1, '2021-06-06T02:29:53Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Trilith', 1, '2021-08-25T10:32:51Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Pixoboo', 1, '2020-10-30T07:58:16Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Oba', 1, '2021-04-21T10:13:18Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Browseblab', 1, '2021-04-21T13:33:23Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Gevee', 1, '2021-03-17T09:09:43Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Trudoo', 1, '2021-04-02T05:39:51Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Meevee', 1, '2021-06-20T21:09:49Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Blogtag', 1, '2021-02-28T03:07:30Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Camimbo', 1, '2021-01-20T00:26:45Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Voomm', 1, '2021-04-26T09:35:57Z',0);
  insert into posts (content, user_id, "createdAt" , likes) values ('Katz', 1, '2020-11-24T01:22:29Z',0);

    `);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
