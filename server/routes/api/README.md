# Routes / API

## Error response json

- `(String)`, `.msg` - displayed to user; custom-set
- `.target` - determines msg location in UI; custom-set
  - `'email'` | `'newEmail'` | `'password'`

These are equivalent

```
res.status(400).json("Error_message");

res.status(400).json({msg: "Error_message"});

try {
	throw Error("Error_message");
} catch (e) {
	res.status(400).json(e.message);
}
```

Resulting state

```
msg: "Error_message",
target: ''
```
