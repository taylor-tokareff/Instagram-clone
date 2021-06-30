import pool from '../utils/pool';

export default class Comment {
  id;
  commentBy;
  userPost;
  userComment;


  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.userPost = row.user_post;
    this.userComment = row.user_comment;
  }

  static async insert({ commentBy, userPost, userComment }) {
    const { rows } = await pool.query(
      'INSERT INTO comment (comment_by, user_post, user_comment) VALUES ($1, $2, $3) RETURNING *',
      [commentBy, userPost, userComment]
    );

    return new Comment(rows[0]);
  }
}
