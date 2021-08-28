# uuid
A decentralized favorites and bookmarks based on Git hosting

### [CHANGELOG](CHANGELOG.md)

### Use
- Fork warehouse (or create a warehouse yourself)
- Modify the `md` file in the `libs` directory
    - One line corresponds to one link, including link, text, icon
    - The icon defaults to the link main domain name + favicon.ico, or a custom icon address starting with a space + `http` after the text
- View (GitHub)
    - <https://uuid.fun/{name}>, `{name}` is your account, the default is `netnr`
    - <https://uuid.fun/{name}/{repos}/{libs}>, `{repos}` repository, default `uuid`; `{libs}` root folder, default `libs`
    -  Such as:
    - <https://uuid.fun>
    - <https://uuid.fun/netnr>
    - <https://uuid.fun/netnr/uuid>
    - <https://uuid.fun/netnr/uuid/libs>

### Description
- You can view more information about global variables: `uu`
- Use `localStorage` as local storage

### Collect
- If you have more ideas and suggestions, remember to submit `Issue`

### Source code
- <https://github.com/netnr/uuid>