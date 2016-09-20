from django.conf.urls import url
from django.contrib import admin
from post import views as p_view
from timetable import views as t_view
from teacher import views as teach_view
from star import views as st_view
from exam import views as e_view
from userP import views as profile_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', p_view.base),
    url(r'^home/', p_view.base2),
    url(r'^profile/', profile_view.base),
    url(r'^exams/', e_view.base),
    url(r'^is_login/', p_view.is_login),
    url(r'^logout/', p_view.logout_user),
    url(r'^change_pw/', p_view.change_pw),
    url(r'^get_pages/', p_view.get_pages),
    url(r'^get_exams/', e_view.get_exams),
    url(r'^get_exam/', e_view.get_exam),
    url(r'^login_user/', p_view.login_user),
    url(r'^contact_us/', p_view.contact_us),
    url(r'^about_us/', p_view.about_us),
    url(r'^time_table/', t_view.time_table),
    url(r'^get_timetable/', t_view.get_timetable),
    url(r'^search_post/', p_view.search_post),
    url(r'^like_post/', p_view.like_post, name="like_post"),
    url(r'^dislike_post/', p_view.dislike_post, name="dislike_post"),
    url(r'^like_cm/', p_view.like_cm, name="like_cm"),
    url(r'^dislike_cm/', p_view.dislike_cm, name="dislike_cm"),
    url(r'^single/(?P<post_id>\d+)/', p_view.get_post),
    url(r'^send_comment/', p_view.send_comment),
    url(r'^all/page/(?P<post_page>\d+)/', p_view.posts_page),
    url(r'^teachers/', teach_view.base),
    url(r'^stars/', st_view.base),
    url(r'^get_file/', e_view.get_file),
]
