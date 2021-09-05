'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    insert into posts (content, user_id, "createdAt") values ('Fliptune', 1, '2021-05-30T15:55:59Z');
  insert into posts (content, user_id, "createdAt") values ('Pixoboo', 1, '2021-08-21T06:05:46Z');
  insert into posts (content, user_id, "createdAt") values ('Chatterbridge', 1, '2020-08-28T15:57:21Z');
  insert into posts (content, user_id, "createdAt") values ('Twimbo', 1, '2020-12-18T21:12:05Z');
  insert into posts (content, user_id, "createdAt") values ('Mybuzz', 1, '2021-04-13T00:21:39Z');
  insert into posts (content, user_id, "createdAt") values ('Avavee', 1, '2020-11-06T06:40:12Z');
  insert into posts (content, user_id, "createdAt") values ('Tazzy', 1, '2021-06-10T10:30:21Z');
  insert into posts (content, user_id, "createdAt") values ('Tavu', 1, '2020-12-23T10:32:53Z');
  insert into posts (content, user_id, "createdAt") values ('Skinix', 1, '2021-06-06T02:29:53Z');
  insert into posts (content, user_id, "createdAt") values ('Trilith', 1, '2021-08-25T10:32:51Z');
  insert into posts (content, user_id, "createdAt") values ('Pixoboo', 1, '2020-10-30T07:58:16Z');
  insert into posts (content, user_id, "createdAt") values ('Oba', 1, '2021-04-21T10:13:18Z');
  insert into posts (content, user_id, "createdAt") values ('Browseblab', 1, '2021-04-21T13:33:23Z');
  insert into posts (content, user_id, "createdAt") values ('Gevee', 1, '2021-03-17T09:09:43Z');
  insert into posts (content, user_id, "createdAt") values ('Trudoo', 1, '2021-04-02T05:39:51Z');
  insert into posts (content, user_id, "createdAt") values ('Meevee', 1, '2021-06-20T21:09:49Z');
  insert into posts (content, user_id, "createdAt") values ('Blogtag', 1, '2021-02-28T03:07:30Z');
  insert into posts (content, user_id, "createdAt") values ('Camimbo', 1, '2021-01-20T00:26:45Z');
  insert into posts (content, user_id, "createdAt") values ('Voomm', 1, '2021-04-26T09:35:57Z');
  insert into posts (content, user_id, "createdAt") values ('Katz', 1, '2020-11-24T01:22:29Z');

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
