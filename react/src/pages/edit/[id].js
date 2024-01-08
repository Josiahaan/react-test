import {
  Box,
  Button,
  Stack,
  TextField,
  Link,
  Divider,
  Avatar,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import ArticleIcon from "@mui/icons-material/Article";
import {
  editArticleAction,
  fetchArticle,
  deleteArticleById,
} from "@/store/actionCreators/arcticleAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const drawerWidth = 240;

export default function EditArticle() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.articleReducer);

  const formik = useFormik({
    initialValues: {
      title: article.title,
      content: article.content,
      submit: null,
    },
    onSubmit: async (values, helpers) => {
      // console.log(values)
      dispatch(editArticleAction(values))
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
      router.push("/edit");
      Link("/edit");
    },
  });

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const newId = pathSegments[pathSegments.length - 1];
    // console.log(newId)
    dispatch(fetchArticle(newId));
  }, []);

  const [inputData, setInputData] = useState({
    title: "",
    content: "",
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    const newInput = {
      ...inputData,
    };
    newInput[name] = value;
    setInputData(newInput);
  };

  const editHandler = (id, e) => {
    e.preventDefault();
    dispatch(editArticleAction(inputData))
      .then((response) => {
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Edit Article Success!",
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
        router.push("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          iconColor: "#57240f",
          title: "Error!",
          text: error.response.data.message,
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
      });
  };

  const deleteHandler = (id) => {
    dispatch(deleteArticleById(id));
    Swal.fire({
      icon: "success",
      iconColor: "#57240f",
      title: "Delete Article Success!",
      color: "#080504",
      background: "#ebd7bb",
      confirmButtonColor: "#a35831",
    });
    router.push("/");
  };

  const handleLink = () => {
    router.push(`/`, { scroll: false });
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Article
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem sx={{ paddingLeft: 10 }} disablePadding>
              <Avatar sx={{ marginRight: 2 }} />
              <p style={{ color: "#63cc43" }}>Logo</p>
            </ListItem>
          </List>
          <Divider />
          <List>
            {["Article"].map((text, index) => (
              <ListItem sx={{ color: "#63cc43" }} key={text} disablePadding>
                <ListItemButton onClick={handleLink}>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <MailIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ArticleIcon />
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          sx={{
            maxWidth: 800,
            py: 20,
            px: 10,
            width: "100%",
          }}
        >
          <h6 style={{ fontWeight: "bold" }}>Edit</h6>
          <Divider sx={{ paddingBottom: 3 }} />
          <form>
            <Stack spacing={3}>
              <h6 style={{ fontWeight: "bold", paddingBottom: 3 }}>Title</h6>
              <TextField
                label={article.title}
                name="title"
                onBlur={formik.handleBlur}
                type="text"
                value={formik.values.title}
                onChange={inputHandler}
              ></TextField>
              <h6 style={{ fontWeight: "bold", paddingBottom: 3 }}>Content</h6>
              <TextField
                label={article.content}
                name="content"
                onBlur={formik.handleBlur}
                type="text"
                value={formik.values.content}
                onChange={inputHandler}
                multiline
                rows={4}
                maxRows={8}
              />
            </Stack>
            <Button
              size="large"
              sx={{ mt: 3, mr: 3, backgroundColor: "#429645" }}
              type="submit"
              variant="contained"
              onClick={() => editHandler(article.id, e)}
            >
              Save
            </Button>
            <Button
              size="large"
              sx={{ mt: 3, backgroundColor: "red" }}
              type="submit"
              variant="contained"
              onClick={() => deleteHandler(article.id)}
            >
              Delete
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}
