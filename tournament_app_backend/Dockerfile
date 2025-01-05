FROM python:3.11-slim
WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app .
EXPOSE 8000
CMD ["python", "main.py"]

# # Using UBI as the base image
# FROM registry.access.redhat.com/ubi8/ubi
# WORKDIR /app

# # Install dependencies for building Python
# RUN yum update -y && \
#     yum install -y \
#     gcc \
#     openssl-devel \
#     bzip2-devel \
#     libffi-devel \
#     zlib-devel \
#     wget \
#     make

# # Download and install Python 3.11.9
# RUN cd /usr/src && \
#     wget https://www.python.org/ftp/python/3.11.9/Python-3.11.9.tgz && \
#     tar xzf Python-3.11.9.tgz && \
#     cd Python-3.11.9 && \
#     ./configure --enable-optimizations && \
#     make altinstall && \
#     ln -s /usr/local/bin/python3.11 /usr/bin/python3.11 && \
#     ln -s /usr/local/bin/pip3.11 /usr/bin/pip3.11 && \
#     cd /usr/src && \
#     rm -rf Python-3.11.9.tgz Python-3.11.9

# # Verify Python installation
# RUN python3.11 --version

# # Install required pip packages
# RUN pip3.11 install --upgrade pip
# COPY ./requirements.txt .
# RUN pip install --no-cache-dir --upgrade -r requirements.txt

# # Start the backend
# COPY ./app .
# EXPOSE 8000
# CMD ["python3.11", "main.py"]
