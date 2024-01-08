import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { Avatar } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { deleteArticleById } from "../store/actionCreators/arcticleAction";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Scrollbar } from "../components/scrollbar";
import { useEffect, useState } from "react";
import { fetchArticles } from "@/store/actionCreators/arcticleAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Search } from "@/components/search";

const drawerWidth = 240;

export default function Main() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articleReducer);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchArticles());
    };

    fetchData();
  }, [dispatch]);

  const handleEditClick = (id) => {
    router.push(`/edit/${id}`, { scroll: false });
  };

  const deleteHandler = (id) => {
    dispatch(deleteArticleById(id));
  };

  const handleLink = () => {
    router.push(`/`, { scroll: false });
  };

  const handleAdd = () => {
    router.push(`/add`, { scroll: false });
  };

  return (
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
      <Card sx={{ py: 20, px: 10 }}>
          {/* <Search /> */}
        <Box sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            sx={{ backgroundColor: "#429645", mb: 2 }}
            size="small"
            variant="text"
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
        <Scrollbar sx={{ flexGrow: 3 }}>
          <Box sx={{ overflowY: "scroll" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#e4f5ec" }}>
                <TableRow>
                  <TableCell sortDirection="desc" sx={{ color: "#21b85b" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "#21b85b" }}>Tittle</TableCell>
                  <TableCell sx={{ color: "#21b85b" }}>Content</TableCell>
                  <TableCell sx={{ color: "#21b85b" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((articles) => {
                  const formattedDate = format(
                    new Date(articles.created_at),
                    "dd MMMM yyyy",
                    { locale: id }
                  );
                  return (
                    <TableRow hover key={articles.id}>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{articles.title}</TableCell>
                      <TableCell>{articles.content}</TableCell>
                      <TableCell>
                        <button
                          onClick={(e) => handleEditClick(articles.id, e)}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ color: "#f0b20a", paddingRight: 2 }}
                          />
                        </button>
                        <button onClick={() => deleteHandler(articles.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "red" }}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
      </Card>
    </Box>
  );
}
