export const FETCH_USER = `
    query user($id: Int!) {
        user(id: $id) {
        id
        name
        email
        description
        avatarPicture
        bannerPicture
        }
    }
    `
;