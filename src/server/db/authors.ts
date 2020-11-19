import { Connection } from './index';
import { Query } from './index';

export const all = async () => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * from authors', (err, results) => {
            if(err) {
            return reject(err);
            } 
            resolve(results);
        });
    });
};

export const one = async (id: number) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * from authors WHERE id = ?', [id], (err, results) => {
            if(err) {
            return reject(err);
            } 
            resolve(results);
        });
    });
};


export const insert = (name: string, email: string) => Query("Insert into authors(name, email)  VALUES (?, ?,);", [name, email]);

export const update = (name: string, email: string) => Query("UPDATE authors SET name = ?, email = ? WHERE authors.id = ?", [name, email]);

export const destroy = (id: number) => Query("DELETE FROM authors WHERE authors.id = ?;", [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
};

