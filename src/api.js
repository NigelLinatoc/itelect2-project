export async function fetchSampleUsers() {
try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const usssserss = await response.json();
    return users.map(({id, name, email}) => ({id, name, email}));
}catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }finally{
    console.log('fetchSampleUsers request attempt has been completed.');
  }
}

export function fetchSampleUsersPromise(){
return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => users.map(({id, name, email}) => ({id, name, email})))
    .catch(error => {
        console.error('Error fetching users:', error.message);
        return [];
    })
    .finally(() => {
        console.log('fetchSampleUsersPromise request attempt has been completed.');
    });
}