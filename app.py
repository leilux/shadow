#!/usr/bin/env python
#coding: utf-8

import os
from tornado import web
from tornado import httpserver
from tornado.ioloop import IOLoop
from tornado.options import parse_command_line
import logging

class Application(web.Application):
    def __init__(self, handlers=[], **kwargs):
        handlers.extend([
            (r"/", home),
        ])

        settings = dict({
            'template_path': os.path.dirname(__file__),
            'static_path': os.path.join(os.path.dirname(__file__), 'static'),
            "debug": True,
        }, **kwargs)

        super(Application, self).__init__(handlers, **settings)


class home(web.RequestHandler):
    def get(self):
        self.render('AT.html')


if __name__ == '__main__':
    parse_command_line()
    application = Application()
    http_server = httpserver.HTTPServer(application)
    http_server.listen(8888)
    logging.info('run on 8888')
    IOLoop.instance().start()
